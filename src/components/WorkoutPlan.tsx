import { WorkoutDay } from "@/data/workouts";
import { motion } from "framer-motion";
import { Dumbbell, Coffee, RotateCcw, Check, Zap } from "lucide-react";

interface WorkoutPlanProps {
  plan: WorkoutDay[];
  onReset: () => void;
  completedExercises: Record<string, boolean>;
  onToggleExercise: (dayIndex: number, exerciseIndex: number) => void;
  onCompleteDay: (dayIndex: number) => void;
}

const WorkoutPlan = ({ plan, onReset, completedExercises, onToggleExercise, onCompleteDay }: WorkoutPlanProps) => {
  const isDayComplete = (dayIndex: number, exercises: WorkoutDay["exercises"]) => {
    return exercises.length > 0 && exercises.every((_, j) => completedExercises[`${dayIndex}-${j}`]);
  };

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
          <p className="text-muted-foreground text-sm mt-1">Tap exercises to mark them complete and earn XP</p>
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
        {plan.map((day, i) => {
          const dayComplete = isDayComplete(i, day.exercises);
          return (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`rounded-2xl border-2 overflow-hidden transition-colors ${
                dayComplete
                  ? "border-accent bg-accent/5"
                  : day.focus === "Rest"
                  ? "border-border bg-card/50"
                  : "border-border bg-card hover:border-accent/40"
              }`}
            >
              {/* Day header */}
              <div className={`px-5 py-4 flex items-center justify-between ${
                dayComplete ? "bg-accent/10" : day.focus === "Rest" ? "bg-muted/30" : "bg-accent/5"
              }`}>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                    {day.day}
                  </div>
                  <div className={`text-lg font-black uppercase tracking-tight mt-0.5 ${
                    dayComplete ? "text-accent" : day.focus === "Rest" ? "text-muted-foreground" : "text-accent"
                  }`}>
                    {day.focus}
                  </div>
                </div>
                {dayComplete && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full bg-accent flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-accent-foreground" />
                  </motion.div>
                )}
              </div>

              {/* Exercises */}
              <div className="px-5 py-4">
                {day.focus === "Rest" ? (
                  <div className="flex flex-col items-center py-6 text-muted-foreground">
                    <Coffee className="w-8 h-8 mb-2 opacity-40" />
                    <span className="text-sm">Rest & Recover</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {day.exercises.map((ex, j) => {
                      const isComplete = completedExercises[`${i}-${j}`];
                      return (
                        <motion.button
                          key={j}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => onToggleExercise(i, j)}
                          className={`w-full flex items-start gap-3 p-2 rounded-lg text-left transition-all ${
                            isComplete
                              ? "bg-accent/10"
                              : "hover:bg-muted/30"
                          }`}
                        >
                          <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                            isComplete
                              ? "bg-accent"
                              : "bg-accent/10"
                          }`}>
                            {isComplete ? (
                              <Check className="w-3.5 h-3.5 text-accent-foreground" />
                            ) : (
                              <Dumbbell className="w-3 h-3 text-accent" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-semibold transition-all ${
                              isComplete ? "text-accent line-through opacity-70" : "text-foreground"
                            }`}>{ex.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {ex.sets} × {ex.reps}
                              {ex.rest !== "—" && <span className="ml-2 text-accent/70">Rest {ex.rest}</span>}
                            </div>
                          </div>
                          {isComplete && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-[10px] font-bold text-accent mt-1"
                            >
                              +10 XP
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}

                    {/* Complete day button */}
                    {day.exercises.length > 0 && isDayComplete(i, day.exercises) && (
                      <motion.button
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        onClick={() => onCompleteDay(i)}
                        className="w-full mt-2 py-2 rounded-lg bg-accent text-accent-foreground font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        Claim Day Bonus +50 XP
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutPlan;
