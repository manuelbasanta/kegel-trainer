import { configureStore } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise, ExerciseHistory, UserProgress, RootState } from '../types';

const initialState: RootState = {
  exercises: [
    {
      id: '1',
      name: 'Basic Kegel Hold',
      description: 'Contract your pelvic floor muscles and hold, then relax.',
      duration: 300,
      contractionTime: 3,
      relaxationTime: 3,
      repetitions: 10,
      difficulty: 'beginner'
    },
    {
      id: '2',
      name: 'Quick Flicks',
      description: 'Quickly contract and relax your pelvic floor muscles.',
      duration: 300,
      contractionTime: 1,
      relaxationTime: 1,
      repetitions: 20,
      difficulty: 'beginner'
    },
    {
      id: '3',
      name: 'Endurance Hold',
      description: 'Hold the contraction for a longer duration to build strength.',
      duration: 420,
      contractionTime: 5,
      relaxationTime: 3,
      repetitions: 15,
      difficulty: 'intermediate'
    },
    {
      id: '4',
      name: 'Advanced Pyramid',
      description: 'Gradually increase hold time, then decrease.',
      duration: 600,
      contractionTime: 10,
      relaxationTime: 5,
      repetitions: 12,
      difficulty: 'advanced'
    }
  ],
  history: [],
  progress: {
    currentLevel: 'beginner',
    totalExercises: 0,
    totalDuration: 0,
    streakDays: 0,
    lastExerciseDate: null
  }
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addExerciseHistory: (state, action: PayloadAction<ExerciseHistory>) => {
      state.history.push(action.payload);
      state.progress.totalExercises += 1;
      state.progress.totalDuration += action.payload.duration;

      const today = new Date().toISOString().split('T')[0];
      const lastDate = state.progress.lastExerciseDate;

      if (lastDate) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastDate === yesterdayStr) {
          state.progress.streakDays += 1;
        } else if (lastDate !== today) {
          state.progress.streakDays = 1;
        }
      } else {
        state.progress.streakDays = 1;
      }

      state.progress.lastExerciseDate = today;

      // Update difficulty level based on completed exercises
      if (state.progress.totalExercises >= 30 && state.progress.currentLevel === 'beginner') {
        state.progress.currentLevel = 'intermediate';
      } else if (state.progress.totalExercises >= 60 && state.progress.currentLevel === 'intermediate') {
        state.progress.currentLevel = 'advanced';
      }
    }
  }
});

export const { addExerciseHistory } = appSlice.actions;

export const store = configureStore({
  reducer: appSlice.reducer
});

export type AppDispatch = typeof store.dispatch;