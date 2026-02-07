import { WorkoutDay } from "@/data/workouts";
import { motion } from "framer-motion";
import { Dumbbell, Coffee, RotateCcw } from "lucide-react";

interface WorkoutPlanProps {
  plan: WorkoutDay[];
  onReset: () => void;
}

const WorkoutPlan = ({ plan, onReset }: WorkoutPlanProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">
            Your <span className="text-accent">Weekly Plan</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Follow this schedule consistently for best results</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-border bg-card text-foreground hover:border-accent/50 transition-all text-sm font-semibold"
        >
          <RotateCcw className="w-4 h-4" />
          New Plan
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {plan.map((day, i) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className={`rounded-2xl border-2 overflow-hidden ${
              day.focus === "Rest"
                ? "border-border bg-card/50"
                : "border-border bg-card hover:border-accent/40 transition-colors"
            }`}
          >
            {/* Day header */}
            <div className={`px-5 py-4 ${day.focus === "Rest" ? "bg-muted/30" : "bg-accent/5"}`}>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                {day.day}
              </div>
              <div className={`text-lg font-black uppercase tracking-tight mt-0.5 ${
                day.focus === "Rest" ? "text-muted-foreground" : "text-accent"
              }`}>
                {day.focus}
              </div>
            </div>

            {/* Exercises */}
            <div className="px-5 py-4">
              {day.focus === "Rest" ? (
                <div className="flex flex-col items-center py-6 text-muted-foreground">
                  <Coffee className="w-8 h-8 mb-2 opacity-40" />
                  <span className="text-sm">Rest & Recover</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {day.exercises.map((ex, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Dumbbell className="w-3 h-3 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground">{ex.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {ex.sets} × {ex.reps}
                          {ex.rest !== "—" && <span className="ml-2 text-accent/70">Rest {ex.rest}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlan;
