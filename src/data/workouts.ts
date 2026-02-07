export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

type Level = "beginner" | "intermediate";
type Location = "home" | "gym";

const homeBeginnerExercises: Record<string, Exercise[]> = {
  "Full Body": [
    { name: "Bodyweight Squats", sets: 3, reps: "12", rest: "60s" },
    { name: "Push-ups (Knee)", sets: 3, reps: "10", rest: "60s" },
    { name: "Glute Bridges", sets: 3, reps: "15", rest: "45s" },
    { name: "Plank Hold", sets: 3, reps: "30s", rest: "45s" },
    { name: "Jumping Jacks", sets: 3, reps: "20", rest: "30s" },
  ],
  "Upper Body": [
    { name: "Push-ups (Knee)", sets: 3, reps: "10", rest: "60s" },
    { name: "Tricep Dips (Chair)", sets: 3, reps: "10", rest: "60s" },
    { name: "Arm Circles", sets: 3, reps: "20", rest: "30s" },
    { name: "Superman Hold", sets: 3, reps: "20s", rest: "45s" },
    { name: "Plank Shoulder Taps", sets: 3, reps: "12", rest: "45s" },
  ],
  "Lower Body": [
    { name: "Bodyweight Squats", sets: 3, reps: "15", rest: "60s" },
    { name: "Lunges", sets: 3, reps: "10/leg", rest: "60s" },
    { name: "Calf Raises", sets: 3, reps: "20", rest: "30s" },
    { name: "Wall Sit", sets: 3, reps: "30s", rest: "45s" },
    { name: "Glute Bridges", sets: 3, reps: "15", rest: "45s" },
  ],
  "Core & Cardio": [
    { name: "Mountain Climbers", sets: 3, reps: "20", rest: "45s" },
    { name: "Bicycle Crunches", sets: 3, reps: "15/side", rest: "45s" },
    { name: "High Knees", sets: 3, reps: "30s", rest: "30s" },
    { name: "Plank Hold", sets: 3, reps: "45s", rest: "45s" },
    { name: "Burpees", sets: 3, reps: "8", rest: "60s" },
  ],
  "Active Recovery": [
    { name: "Walking", sets: 1, reps: "20 min", rest: "—" },
    { name: "Yoga Flow", sets: 1, reps: "15 min", rest: "—" },
    { name: "Foam Rolling", sets: 1, reps: "10 min", rest: "—" },
  ],
};

const homeIntermediateExercises: Record<string, Exercise[]> = {
  "Full Body": [
    { name: "Jump Squats", sets: 4, reps: "15", rest: "45s" },
    { name: "Push-ups", sets: 4, reps: "15", rest: "45s" },
    { name: "Single-Leg Deadlift", sets: 3, reps: "12/leg", rest: "60s" },
    { name: "Burpees", sets: 4, reps: "12", rest: "45s" },
    { name: "Plank to Push-up", sets: 3, reps: "10", rest: "60s" },
  ],
  "Upper Body": [
    { name: "Diamond Push-ups", sets: 4, reps: "12", rest: "45s" },
    { name: "Pike Push-ups", sets: 4, reps: "10", rest: "60s" },
    { name: "Tricep Dips (Chair)", sets: 4, reps: "15", rest: "45s" },
    { name: "Superman Pulls", sets: 3, reps: "15", rest: "45s" },
    { name: "Decline Push-ups", sets: 3, reps: "12", rest: "60s" },
  ],
  "Lower Body": [
    { name: "Bulgarian Split Squats", sets: 4, reps: "12/leg", rest: "60s" },
    { name: "Pistol Squat Progressions", sets: 3, reps: "8/leg", rest: "60s" },
    { name: "Jump Lunges", sets: 4, reps: "10/leg", rest: "45s" },
    { name: "Single-Leg Calf Raises", sets: 4, reps: "15/leg", rest: "30s" },
    { name: "Wall Sit", sets: 3, reps: "60s", rest: "45s" },
  ],
  "Core & HIIT": [
    { name: "Burpees", sets: 4, reps: "15", rest: "30s" },
    { name: "V-ups", sets: 4, reps: "15", rest: "45s" },
    { name: "Mountain Climbers", sets: 4, reps: "30", rest: "30s" },
    { name: "Plank Hold", sets: 3, reps: "60s", rest: "30s" },
    { name: "Tuck Jumps", sets: 3, reps: "10", rest: "45s" },
  ],
  "Active Recovery": [
    { name: "Light Jog", sets: 1, reps: "25 min", rest: "—" },
    { name: "Yoga Flow", sets: 1, reps: "20 min", rest: "—" },
    { name: "Stretching Routine", sets: 1, reps: "15 min", rest: "—" },
  ],
};

const gymBeginnerExercises: Record<string, Exercise[]> = {
  "Full Body": [
    { name: "Goblet Squats", sets: 3, reps: "12", rest: "60s" },
    { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60s" },
    { name: "Dumbbell Bench Press", sets: 3, reps: "10", rest: "60s" },
    { name: "Leg Press", sets: 3, reps: "12", rest: "60s" },
    { name: "Cable Face Pulls", sets: 3, reps: "15", rest: "45s" },
  ],
  "Push": [
    { name: "Barbell Bench Press", sets: 3, reps: "10", rest: "90s" },
    { name: "Dumbbell Shoulder Press", sets: 3, reps: "10", rest: "60s" },
    { name: "Incline Dumbbell Press", sets: 3, reps: "10", rest: "60s" },
    { name: "Tricep Pushdown", sets: 3, reps: "12", rest: "45s" },
    { name: "Lateral Raises", sets: 3, reps: "12", rest: "45s" },
  ],
  "Pull": [
    { name: "Lat Pulldown", sets: 3, reps: "10", rest: "60s" },
    { name: "Seated Cable Row", sets: 3, reps: "12", rest: "60s" },
    { name: "Dumbbell Bicep Curls", sets: 3, reps: "12", rest: "45s" },
    { name: "Face Pulls", sets: 3, reps: "15", rest: "45s" },
    { name: "Hammer Curls", sets: 3, reps: "10", rest: "45s" },
  ],
  "Legs": [
    { name: "Barbell Squats", sets: 3, reps: "10", rest: "90s" },
    { name: "Leg Press", sets: 3, reps: "12", rest: "60s" },
    { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "60s" },
    { name: "Leg Curls", sets: 3, reps: "12", rest: "45s" },
    { name: "Calf Raises (Machine)", sets: 3, reps: "15", rest: "45s" },
  ],
  "Active Recovery": [
    { name: "Treadmill Walk", sets: 1, reps: "20 min", rest: "—" },
    { name: "Stretching", sets: 1, reps: "15 min", rest: "—" },
    { name: "Foam Rolling", sets: 1, reps: "10 min", rest: "—" },
  ],
};

const gymIntermediateExercises: Record<string, Exercise[]> = {
  "Full Body": [
    { name: "Barbell Squats", sets: 4, reps: "10", rest: "90s" },
    { name: "Barbell Bench Press", sets: 4, reps: "8", rest: "90s" },
    { name: "Barbell Rows", sets: 4, reps: "10", rest: "60s" },
    { name: "Overhead Press", sets: 3, reps: "10", rest: "60s" },
    { name: "Plank Hold", sets: 3, reps: "60s", rest: "45s" },
  ],
  "Push": [
    { name: "Barbell Bench Press", sets: 4, reps: "8", rest: "90s" },
    { name: "Incline Dumbbell Press", sets: 4, reps: "10", rest: "60s" },
    { name: "Overhead Press", sets: 4, reps: "8", rest: "90s" },
    { name: "Cable Flyes", sets: 3, reps: "12", rest: "45s" },
    { name: "Tricep Dips (Weighted)", sets: 3, reps: "10", rest: "60s" },
    { name: "Lateral Raises", sets: 4, reps: "15", rest: "30s" },
  ],
  "Pull": [
    { name: "Deadlift", sets: 4, reps: "6", rest: "120s" },
    { name: "Pull-ups (Weighted)", sets: 4, reps: "8", rest: "90s" },
    { name: "Barbell Rows", sets: 4, reps: "10", rest: "60s" },
    { name: "Face Pulls", sets: 3, reps: "15", rest: "45s" },
    { name: "Barbell Curls", sets: 3, reps: "10", rest: "45s" },
    { name: "Hammer Curls", sets: 3, reps: "12", rest: "45s" },
  ],
  "Legs": [
    { name: "Barbell Squats", sets: 4, reps: "8", rest: "120s" },
    { name: "Romanian Deadlift", sets: 4, reps: "10", rest: "90s" },
    { name: "Leg Press", sets: 4, reps: "12", rest: "60s" },
    { name: "Walking Lunges", sets: 3, reps: "12/leg", rest: "60s" },
    { name: "Leg Curls", sets: 3, reps: "12", rest: "45s" },
    { name: "Calf Raises", sets: 4, reps: "15", rest: "30s" },
  ],
  "Active Recovery": [
    { name: "Light Cardio", sets: 1, reps: "25 min", rest: "—" },
    { name: "Mobility Work", sets: 1, reps: "20 min", rest: "—" },
    { name: "Foam Rolling", sets: 1, reps: "10 min", rest: "—" },
  ],
};

function getExerciseBank(level: Level, location: Location) {
  if (location === "home") {
    return level === "beginner" ? homeBeginnerExercises : homeIntermediateExercises;
  }
  return level === "beginner" ? gymBeginnerExercises : gymIntermediateExercises;
}

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getSplitForDays(days: number, location: Location): string[] {
  if (location === "home") {
    const splits: Record<number, string[]> = {
      2: ["Full Body", "Core & Cardio"],
      3: ["Full Body", "Upper Body", "Lower Body"],
      4: ["Upper Body", "Lower Body", "Core & Cardio", "Full Body"],
      5: ["Upper Body", "Lower Body", "Core & Cardio", "Full Body", "Active Recovery"],
      6: ["Upper Body", "Lower Body", "Core & Cardio", "Full Body", "Upper Body", "Active Recovery"],
    };
    return splits[days] || splits[3];
  }
  const splits: Record<number, string[]> = {
    2: ["Full Body", "Full Body"],
    3: ["Push", "Pull", "Legs"],
    4: ["Push", "Pull", "Legs", "Full Body"],
    5: ["Push", "Pull", "Legs", "Push", "Pull"],
    6: ["Push", "Pull", "Legs", "Push", "Pull", "Legs"],
  };
  return splits[days] || splits[3];
}

export function generateWorkoutPlan(level: Level, location: Location, daysPerWeek: number): WorkoutDay[] {
  const bank = getExerciseBank(level, location);
  const split = getSplitForDays(daysPerWeek, location);
  const plan: WorkoutDay[] = [];

  let workoutIndex = 0;
  for (let i = 0; i < 7; i++) {
    if (workoutIndex < daysPerWeek) {
      const focus = split[workoutIndex];
      plan.push({
        day: dayNames[i],
        focus,
        exercises: bank[focus] || [],
      });
      workoutIndex++;
      // Space out rest days
      if (daysPerWeek <= 4 && workoutIndex < daysPerWeek && (i + 1) % 2 === 0) {
        // skip to add rest day
      }
    } else {
      plan.push({ day: dayNames[i], focus: "Rest", exercises: [] });
    }
  }

  return plan;
}
