import { motion } from "framer-motion";
import { ACHIEVEMENTS, PlayerStats } from "@/data/gamification";
import { Lock } from "lucide-react";

interface AchievementsPanelProps {
  stats: PlayerStats;
}

const AchievementsPanel = ({ stats }: AchievementsPanelProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4">Achievements</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {ACHIEVEMENTS.map((a, i) => {
          const unlocked = stats.unlockedAchievements.includes(a.id);
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border-2 p-3 text-center transition-all ${
                unlocked
                  ? "border-accent/40 bg-accent/5"
                  : "border-border bg-card/30 opacity-50"
              }`}
            >
              <div className="text-2xl mb-1">
                {unlocked ? a.icon : <Lock className="w-5 h-5 mx-auto text-muted-foreground" />}
              </div>
              <div className={`text-xs font-bold ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                {a.name}
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{a.description}</div>
              {unlocked && (
                <div className="text-[10px] font-bold text-accent mt-1">+{a.xpReward} XP</div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsPanel;
