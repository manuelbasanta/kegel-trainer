import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { RootState, Exercise } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, layout } from '../constants/styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const exercises = useSelector((state: RootState) => state.exercises);
  const progress = useSelector((state: RootState) => state.progress);



  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={[styles.exerciseCard, 
        item.difficulty === progress.currentLevel && styles.currentLevelCard
      ]}
      onPress={() => navigation.navigate('Exercise', { exerciseId: item.id })}
    >
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text style={styles.exerciseDescription}>{item.description}</Text>
      <View style={styles.exerciseDetails}>
        <Text style={styles.detailText}>Duration: {item.duration}s</Text>
        <Text style={styles.detailText}>Reps: {item.repetitions}</Text>
        <Text style={styles.difficultyText}>{item.difficulty}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to Kegel Trainer</Text>
        <Text style={styles.levelText}>Current Level: {progress.currentLevel}</Text>
      </View>

      <FlatList
        data={exercises}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.exerciseList}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('History')}
        >
          <Ionicons name="time-outline" size={24} color={colors.grey.dark} />
          <Text style={styles.bottomNavText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('Stats')}
        >
          <Ionicons name="stats-chart-outline" size={24} color={colors.grey.dark} />
          <Text style={styles.bottomNavText}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('Education')}
        >
          <Ionicons name="book-outline" size={24} color={colors.grey.dark} />
          <Text style={styles.bottomNavText}>Learn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey.medium,
  },
  welcomeText: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.black,
  },
  levelText: {
    fontSize: typography.sizes.md,
    color: colors.grey.dark,
    marginTop: spacing.xs,
  },
  exerciseList: {
    padding: spacing.md,
  },
  exerciseCard: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...layout.shadow.small,
  },
  currentLevelCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  exerciseName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.black,
  },
  exerciseDescription: {
    fontSize: typography.sizes.sm,
    color: colors.grey.dark,
    marginTop: spacing.xs,
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.grey.medium,
  },
  detailText: {
    fontSize: typography.sizes.xs,
    color: colors.grey.darker,
  },
  difficultyText: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.grey.light,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...layout.shadow.small,
  },
  bottomNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  bottomNavText: {
    color: colors.grey.dark,
    fontSize: typography.sizes.xs,
    marginTop: spacing.xs,
  },
});