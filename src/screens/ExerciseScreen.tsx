import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { RootState } from '../types';
import { addExerciseHistory } from '../store';
import { colors, spacing, typography, layout } from '../constants/styles';

type ExerciseScreenRouteProp = RouteProp<RootStackParamList, 'Exercise'>;
type ExerciseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Exercise'>;

export default function ExerciseScreen() {
  const route = useRoute<ExerciseScreenRouteProp>();
  const navigation = useNavigation<ExerciseScreenNavigationProp>();
  const dispatch = useDispatch();

  const exercise = useSelector((state: RootState) =>
    state.exercises.find(ex => ex.id === route.params.exerciseId)
  );

  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentRep, setCurrentRep] = useState(1);
  const [isContraction, setIsContraction] = useState(true);
  const [totalTime, setTotalTime] = useState(0);

  // Animation values
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!exercise) return;
    setTimeLeft(exercise.contractionTime);
    setTotalTime(0);
  }, [exercise]);

  // Animation effect
  useEffect(() => {
    if (!exercise || !isActive) return;

    const duration = isContraction ? exercise.contractionTime * 1000 : exercise.relaxationTime * 1000;
    
    Animated.timing(animatedValue, {
      toValue: isContraction ? 1 : 0,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [isContraction, isActive, exercise]);

  const handleComplete = useCallback(() => {
    if (!exercise) return;

    const historyEntry = {
      id: Date.now().toString(),
      exerciseId: exercise.id,
      completedAt: new Date().toISOString(),
      duration: totalTime,
      repetitions: exercise.repetitions,
    };

    dispatch(addExerciseHistory(historyEntry));
    Alert.alert('Great job!', 'Exercise completed successfully!');
    navigation.goBack();
  }, [exercise, totalTime, dispatch, navigation]);

  useEffect(() => {
    if (!exercise || !isActive) return;

    const interval = setInterval(() => {
      setTimeLeft(time => {
        if (time <= 1) {
          if (currentRep >= exercise.repetitions && !isContraction) {
            clearInterval(interval);
            setIsActive(false);
            handleComplete();
            return 0;
          }

          const nextIsContraction = !isContraction;
          setIsContraction(nextIsContraction);
          if (!nextIsContraction) {
            setCurrentRep(rep => rep + 1);
          }
          return nextIsContraction ? exercise.contractionTime : exercise.relaxationTime;
        }
        return time - 1;
      });
      setTotalTime(total => total + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, currentRep, isContraction, exercise, handleComplete]);

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text>Exercise not found</Text>
      </View>
    );
  }

  const animatedStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1.5, 1],
        }),
      },
    ],
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.primary, colors.secondary],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseDescription}>{exercise.description}</Text>
      </View>

      <View style={styles.timerContainer}>
        <Animated.View style={[styles.animationCircle, animatedStyle]} />
        <Text style={styles.timerText}>{timeLeft}s</Text>
        <Text style={styles.phaseText}>
          {isContraction ? 'Contract' : 'Relax'}
        </Text>
        <Text style={styles.repText}>
          Rep {currentRep} of {exercise.repetitions}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isActive && styles.stopButton]}
        onPress={() => setIsActive(!isActive)}
      >
        <Text style={styles.buttonText}>
          {isActive ? 'Pause' : 'Start'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xxl,
  },
  exerciseName: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  exerciseDescription: {
    fontSize: typography.sizes.md,
    color: colors.grey.dark,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationCircle: {
    width: 150,
    height: 150,
    borderRadius: layout.borderRadius.circle,
    marginBottom: spacing.xxl,
  },
  timerText: {
    fontSize: typography.sizes.huge,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  phaseText: {
    fontSize: typography.sizes.xl,
    color: colors.black,
    marginTop: spacing.lg,
  },
  repText: {
    fontSize: typography.sizes.lg,
    color: colors.grey.dark,
    marginTop: spacing.sm,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: layout.borderRadius.lg,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
});