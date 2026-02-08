import { motion, AnimatePresence } from "framer-motion";
import { ACHIEVEMENTS } from "@/data/gamification";
import { X } from "lucide-react";

interface AchievementToastProps {
  achievementIds: string[];
  onDismiss: () => void;
}

const AchievementToast = ({ achievementIds, onDismiss }: AchievementToastProps) => {
  if (achievementIds.length === 0) return null;

  const achievements = achievementIds
    .map((id) => ACHIEVEMENTS.find((a) => a.id === id))
    .filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-md"
      >
        <div className="rounded-2xl border-2 border-accent bg-card shadow-[0_0_40px_hsl(var(--accent)/0.3)] p-5">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              🏆 Achievement Unlocked!
            </span>
            <button onClick={onDismiss} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {achievements.map((a) => (
              <motion.div
                key={a!.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">{a!.icon}</span>
                <div>
                  <div className="text-sm font-bold text-foreground">{a!.name}</div>
                  <div className="text-xs text-muted-foreground">{a!.description}</div>
                </div>
                <span className="ml-auto text-xs font-bold text-accent">+{a!.xpReward} XP</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementToast;
