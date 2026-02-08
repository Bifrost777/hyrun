export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji
  xpReward: number;
  condition: (stats: PlayerStats) => boolean;
}

export interface PlayerStats {
  xp: number;
  level: number;
  totalWorkoutsCompleted: number;
  totalExercisesCompleted: number;
  currentStreak: number;
  longestStreak: number;
  lastWorkoutDate: string | null;
  unlockedAchievements: string[];
  completedExercises: Record<string, boolean>; // "dayIndex-exerciseIndex"
  plansGenerated: number;
}

export const DEFAULT_STATS: PlayerStats = {
  xp: 0,
  level: 1,
  totalWorkoutsCompleted: 0,
  totalExercisesCompleted: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastWorkoutDate: null,
  unlockedAchievements: [],
  completedExercises: {},
  plansGenerated: 0,
};

// XP thresholds per level (cumulative)
export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800, 4700, 5700, 6800, 8000, 9500,
  11000, 13000, 15000, 17500, 20000,
];

export const RANK_NAMES = [
  "Rookie",
  "Starter",
  "Trainee",
  "Athlete",
  "Fighter",
  "Warrior",
  "Champion",
  "Elite",
  "Legend",
  "Titan",
  "Iron God",
];

export function getRankForLevel(level: number): string {
  const index = Math.min(Math.floor((level - 1) / 2), RANK_NAMES.length - 1);
  return RANK_NAMES[index];
}

export function getXpForNextLevel(level: number): number {
  if (level >= LEVEL_THRESHOLDS.length) return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + level * 500;
  return LEVEL_THRESHOLDS[level];
}

export function getXpForCurrentLevel(level: number): number {
  if (level <= 1) return 0;
  if (level - 1 >= LEVEL_THRESHOLDS.length) return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (level - 1) * 500;
  return LEVEL_THRESHOLDS[level - 1];
}

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

export const XP_REWARDS = {
  exerciseComplete: 10,
  workoutComplete: 50,  // bonus for finishing all exercises in a day
  planGenerated: 15,
  streakBonus: 25,      // per day of streak
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_plan",
    name: "Architect",
    description: "Generate your first workout plan",
    icon: "📐",
    xpReward: 25,
    condition: (s) => s.plansGenerated >= 1,
  },
  {
    id: "first_exercise",
    name: "First Rep",
    description: "Complete your first exercise",
    icon: "💪",
    xpReward: 20,
    condition: (s) => s.totalExercisesCompleted >= 1,
  },
  {
    id: "first_workout",
    name: "Day One",
    description: "Complete a full workout day",
    icon: "🏋️",
    xpReward: 50,
    condition: (s) => s.totalWorkoutsCompleted >= 1,
  },
  {
    id: "five_workouts",
    name: "Dedicated",
    description: "Complete 5 full workout days",
    icon: "🔥",
    xpReward: 100,
    condition: (s) => s.totalWorkoutsCompleted >= 5,
  },
  {
    id: "ten_workouts",
    name: "Unstoppable",
    description: "Complete 10 full workout days",
    icon: "⚡",
    xpReward: 200,
    condition: (s) => s.totalWorkoutsCompleted >= 10,
  },
  {
    id: "streak_3",
    name: "Hat Trick",
    description: "Achieve a 3-day workout streak",
    icon: "🎯",
    xpReward: 75,
    condition: (s) => s.longestStreak >= 3,
  },
  {
    id: "streak_7",
    name: "Iron Week",
    description: "Achieve a 7-day workout streak",
    icon: "🏆",
    xpReward: 200,
    condition: (s) => s.longestStreak >= 7,
  },
  {
    id: "level_5",
    name: "Rising Star",
    description: "Reach level 5",
    icon: "⭐",
    xpReward: 100,
    condition: (s) => s.level >= 5,
  },
  {
    id: "level_10",
    name: "Elite Status",
    description: "Reach level 10",
    icon: "👑",
    xpReward: 250,
    condition: (s) => s.level >= 10,
  },
  {
    id: "exercises_50",
    name: "Half Century",
    description: "Complete 50 exercises total",
    icon: "🎖️",
    xpReward: 150,
    condition: (s) => s.totalExercisesCompleted >= 50,
  },
  {
    id: "exercises_100",
    name: "Centurion",
    description: "Complete 100 exercises total",
    icon: "🛡️",
    xpReward: 300,
    condition: (s) => s.totalExercisesCompleted >= 100,
  },
  {
    id: "plans_5",
    name: "Strategist",
    description: "Generate 5 workout plans",
    icon: "🧠",
    xpReward: 75,
    condition: (s) => s.plansGenerated >= 5,
  },
];
