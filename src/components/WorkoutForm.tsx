import { useState } from "react";
import { Dumbbell, Home, Building2, Flame } from "lucide-react";
import { motion } from "framer-motion";

interface WorkoutFormProps {
  onGenerate: (level: "beginner" | "intermediate", location: "home" | "gym", days: number) => void;
}

const WorkoutForm = ({ onGenerate }: WorkoutFormProps) => {
  const [level, setLevel] = useState<"beginner" | "intermediate" | null>(null);
  const [location, setLocation] = useState<"home" | "gym" | null>(null);
  const [days, setDays] = useState<number>(3);

  const canGenerate = level && location;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto space-y-10"
    >
      {/* Level */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Fitness Level</h3>
        <div className="grid grid-cols-2 gap-4">
          {(["beginner", "intermediate"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`group relative rounded-xl border-2 p-6 text-left transition-all duration-200 ${
                level === l
                  ? "border-accent bg-accent/10 shadow-[0_0_30px_hsl(var(--accent)/0.15)]"
                  : "border-border hover:border-accent/50 bg-card"
              }`}
            >
              <div className={`text-lg font-bold capitalize ${level === l ? "text-accent" : "text-foreground"}`}>
                {l}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {l === "beginner" ? "New to fitness or returning" : "Consistent training experience"}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Workout Location</h3>
        <div className="grid grid-cols-2 gap-4">
          {([
            { value: "home" as const, icon: Home, desc: "No equipment needed" },
            { value: "gym" as const, icon: Building2, desc: "Full gym access" },
          ]).map(({ value, icon: Icon, desc }) => (
            <button
              key={value}
              onClick={() => setLocation(value)}
              className={`group relative rounded-xl border-2 p-6 text-left transition-all duration-200 ${
                location === value
                  ? "border-accent bg-accent/10 shadow-[0_0_30px_hsl(var(--accent)/0.15)]"
                  : "border-border hover:border-accent/50 bg-card"
              }`}
            >
              <Icon className={`w-6 h-6 mb-2 ${location === value ? "text-accent" : "text-muted-foreground"}`} />
              <div className={`text-lg font-bold capitalize ${location === value ? "text-accent" : "text-foreground"}`}>
                {value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Days */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Days Per Week</h3>
        <div className="flex gap-3">
          {[2, 3, 4, 5, 6].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`w-14 h-14 rounded-xl border-2 font-bold text-lg transition-all duration-200 ${
                days === d
                  ? "border-accent bg-accent text-accent-foreground shadow-[0_0_20px_hsl(var(--accent)/0.3)]"
                  : "border-border bg-card text-foreground hover:border-accent/50"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Generate */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={!canGenerate}
        onClick={() => canGenerate && onGenerate(level, location, days)}
        className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 ${
          canGenerate
            ? "bg-accent text-accent-foreground shadow-[0_0_40px_hsl(var(--accent)/0.3)] hover:shadow-[0_0_60px_hsl(var(--accent)/0.4)]"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        <Flame className="w-5 h-5" />
        Generate Plan
        <Dumbbell className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export default WorkoutForm;
