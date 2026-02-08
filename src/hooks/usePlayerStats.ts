import { useState, useCallback, useEffect } from "react";
import {
  PlayerStats,
  DEFAULT_STATS,
  calculateLevel,
  ACHIEVEMENTS,
  XP_REWARDS,
} from "@/data/gamification";

const STORAGE_KEY = "ironplan_player_stats";

function loadStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {}
  return { ...DEFAULT_STATS };
}

function saveStats(stats: PlayerStats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function usePlayerStats() {
  const [stats, setStats] = useState<PlayerStats>(loadStats);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [leveledUp, setLeveledUp] = useState(false);

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  const addXp = useCallback((amount: number) => {
    setStats((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = calculateLevel(newXp);
      if (newLevel > prev.level) {
        setLeveledUp(true);
        setTimeout(() => setLeveledUp(false), 3000);
      }
      return { ...prev, xp: newXp, level: newLevel };
    });
  }, []);

  const checkAchievements = useCallback((currentStats: PlayerStats) => {
    const newlyUnlocked: string[] = [];
    ACHIEVEMENTS.forEach((a) => {
      if (!currentStats.unlockedAchievements.includes(a.id) && a.condition(currentStats)) {
        newlyUnlocked.push(a.id);
      }
    });
    if (newlyUnlocked.length > 0) {
      setNewAchievements(newlyUnlocked);
      setTimeout(() => setNewAchievements([]), 4000);
      setStats((prev) => {
        const bonusXp = newlyUnlocked.reduce((sum, id) => {
          const ach = ACHIEVEMENTS.find((a) => a.id === id);
          return sum + (ach?.xpReward || 0);
        }, 0);
        const newXp = prev.xp + bonusXp;
        return {
          ...prev,
          xp: newXp,
          level: calculateLevel(newXp),
          unlockedAchievements: [...prev.unlockedAchievements, ...newlyUnlocked],
        };
      });
    }
  }, []);

  const completeExercise = useCallback(
    (dayIndex: number, exerciseIndex: number) => {
      const key = `${dayIndex}-${exerciseIndex}`;
      setStats((prev) => {
        if (prev.completedExercises[key]) return prev;
        const newCompleted = { ...prev.completedExercises, [key]: true };
        const newStats = {
          ...prev,
          completedExercises: newCompleted,
          totalExercisesCompleted: prev.totalExercisesCompleted + 1,
          xp: prev.xp + XP_REWARDS.exerciseComplete,
          level: calculateLevel(prev.xp + XP_REWARDS.exerciseComplete),
        };
        setTimeout(() => checkAchievements(newStats), 100);
        return newStats;
      });
    },
    [checkAchievements]
  );

  const uncompleteExercise = useCallback((dayIndex: number, exerciseIndex: number) => {
    const key = `${dayIndex}-${exerciseIndex}`;
    setStats((prev) => {
      if (!prev.completedExercises[key]) return prev;
      const newCompleted = { ...prev.completedExercises };
      delete newCompleted[key];
      const newXp = Math.max(0, prev.xp - XP_REWARDS.exerciseComplete);
      return {
        ...prev,
        completedExercises: newCompleted,
        totalExercisesCompleted: Math.max(0, prev.totalExercisesCompleted - 1),
        xp: newXp,
        level: calculateLevel(newXp),
      };
    });
  }, []);

  const completeWorkoutDay = useCallback(() => {
    setStats((prev) => {
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const isConsecutive = prev.lastWorkoutDate === yesterday;
      const newStreak = isConsecutive ? prev.currentStreak + 1 : 1;
      const streakBonus = newStreak > 1 ? XP_REWARDS.streakBonus : 0;
      const totalBonus = XP_REWARDS.workoutComplete + streakBonus;
      const newXp = prev.xp + totalBonus;

      const newStats = {
        ...prev,
        totalWorkoutsCompleted: prev.totalWorkoutsCompleted + 1,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastWorkoutDate: today,
        xp: newXp,
        level: calculateLevel(newXp),
      };
      setTimeout(() => checkAchievements(newStats), 100);
      return newStats;
    });
  }, [checkAchievements]);

  const recordPlanGenerated = useCallback(() => {
    setStats((prev) => {
      const newXp = prev.xp + XP_REWARDS.planGenerated;
      const newStats = {
        ...prev,
        plansGenerated: prev.plansGenerated + 1,
        completedExercises: {},
        xp: newXp,
        level: calculateLevel(newXp),
      };
      setTimeout(() => checkAchievements(newStats), 100);
      return newStats;
    });
  }, [checkAchievements]);

  const dismissAchievements = useCallback(() => setNewAchievements([]), []);
  const dismissLevelUp = useCallback(() => setLeveledUp(false), []);

  return {
    stats,
    newAchievements,
    leveledUp,
    completeExercise,
    uncompleteExercise,
    completeWorkoutDay,
    recordPlanGenerated,
    addXp,
    dismissAchievements,
    dismissLevelUp,
  };
}
