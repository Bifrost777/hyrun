import { motion } from "framer-motion";
import { Zap, Flame, Trophy } from "lucide-react";
import { PlayerStats, getRankForLevel, getXpForNextLevel, getXpForCurrentLevel } from "@/data/gamification";

interface PlayerHUDProps {
  stats: PlayerStats;
  leveledUp: boolean;
}

const PlayerHUD = ({ stats, leveledUp }: PlayerHUDProps) => {
  const currentLevelXp = getXpForCurrentLevel(stats.level);
  const nextLevelXp = getXpForNextLevel(stats.level);
  const xpInLevel = stats.xp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;
  const progress = xpNeeded > 0 ? Math.min((xpInLevel / xpNeeded) * 100, 100) : 100;
  const rank = getRankForLevel(stats.level);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="rounded-2xl border-2 border-border bg-card p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          {/* Level badge */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={leveledUp ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.6 }}
              className="relative w-14 h-14 rounded-xl bg-accent flex items-center justify-center"
            >
              <span className="text-2xl font-black text-accent-foreground">{stats.level}</span>
              {leveledUp && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0 rounded-xl border-2 border-accent"
                />
              )}
            </motion.div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Rank</div>
              <div className="text-sm font-black uppercase text-accent">{rank}</div>
            </div>
          </div>

          {/* XP bar */}
          <div className="flex-1 min-w-[200px] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-muted-foreground flex items-center gap-1">
                <Zap className="w-3 h-3 text-accent" />
                {stats.xp.toLocaleString()} XP
              </span>
              <span className="text-muted-foreground">
                {nextLevelXp.toLocaleString()} XP to Lv.{stats.level + 1}
              </span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  boxShadow: "0 0 12px hsl(var(--accent) / 0.5)",
                }}
              />
            </div>
          </div>

          {/* Stats pills */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/50 border border-border">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold text-foreground">{stats.currentStreak}</span>
              <span className="text-xs text-muted-foreground hidden sm:inline">streak</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/50 border border-border">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold text-foreground">{stats.unlockedAchievements.length}</span>
              <span className="text-xs text-muted-foreground hidden sm:inline">badges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Level up toast */}
      {leveledUp && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className="mt-3 rounded-xl border-2 border-accent bg-accent/10 p-3 text-center"
        >
          <span className="text-accent font-black uppercase tracking-wider text-sm">
            ⚡ Level Up! You reached Level {stats.level}! ⚡
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PlayerHUD;
