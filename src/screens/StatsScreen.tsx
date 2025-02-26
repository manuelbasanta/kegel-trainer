import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { colors, spacing, typography, layout } from '../constants/styles';

export default function StatsScreen() {
  const progress = useSelector((state: RootState) => state.progress);
  const history = useSelector((state: RootState) => state.history);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

    return parts.join(' ');
  };

  const calculateLastWeekExercises = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return history.filter(entry => {
      const entryDate = new Date(entry.completedAt);
      return entryDate >= oneWeekAgo;
    }).length;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Progress</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Current Level:</Text>
          <Text style={styles.statValue}>{progress.currentLevel}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Streak:</Text>
          <Text style={styles.statValue}>{progress.streakDays} days</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lifetime Stats</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Exercises:</Text>
          <Text style={styles.statValue}>{progress.totalExercises}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Time:</Text>
          <Text style={styles.statValue}>{formatDuration(progress.totalDuration)}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Last 7 Days:</Text>
          <Text style={styles.statValue}>{calculateLastWeekExercises()} exercises</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Last Exercise:</Text>
          <Text style={styles.statValue}>
            {progress.lastExerciseDate 
              ? new Date(progress.lastExerciseDate).toLocaleDateString()
              : 'No exercises yet'}
          </Text>
        </View>
      </View>

      <View style={styles.progressInfo}>
        <Text style={styles.progressInfoTitle}>Level Up Guide</Text>
        <Text style={styles.progressInfoText}>
          {progress.currentLevel === 'beginner'
            ? `Complete ${30 - progress.totalExercises} more exercises to reach intermediate level`
            : progress.currentLevel === 'intermediate'
            ? `Complete ${60 - progress.totalExercises} more exercises to reach advanced level`
            : 'You have reached the advanced level!'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.black,
    marginBottom: spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey.light,
  },
  statLabel: {
    fontSize: typography.sizes.md,
    color: colors.grey.dark,
  },
  statValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  progressInfo: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.md,
    padding: spacing.lg,
    marginTop: spacing.xs,
  },
  progressInfoTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  progressInfoText: {
    fontSize: typography.sizes.md,
    color: colors.grey.dark,
  },
});