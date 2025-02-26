export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  contractionTime: number; // in seconds
  relaxationTime: number; // in seconds
  repetitions: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ExerciseHistory {
  id: string;
  exerciseId: string;
  completedAt: string;
  duration: number;
  repetitions: number;
}

export interface UserProgress {
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  totalExercises: number;
  totalDuration: number; // in seconds
  streakDays: number;
  lastExerciseDate: string | null;
}

export interface RootState {
  exercises: Exercise[];
  history: ExerciseHistory[];
  progress: UserProgress;
}