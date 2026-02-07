import { useState } from "react";
import { Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutPlan from "@/components/WorkoutPlan";
import { generateWorkoutPlan, WorkoutDay } from "@/data/workouts";

const Index = () => {
  const [plan, setPlan] = useState<WorkoutDay[] | null>(null);

  const handleGenerate = (level: "beginner" | "intermediate", location: "home" | "gym", days: number) => {
    setPlan(generateWorkoutPlan(level, location, days));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-black uppercase tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            IRON<span className="text-accent">PLAN</span>
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!plan ? (
            <motion.div
              key="form"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {/* Hero */}
              <div className="text-center max-w-xl mx-auto space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95]"
                >
                  Build Your
                  <br />
                  <span className="text-accent">Workout Plan</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-muted-foreground text-lg"
                >
                  Select your preferences and get a personalized weekly schedule in seconds.
                </motion.p>
              </div>

              <WorkoutForm onGenerate={handleGenerate} />
            </motion.div>
          ) : (
            <motion.div
              key="plan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <WorkoutPlan plan={plan} onReset={() => setPlan(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
