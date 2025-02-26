import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { colors, spacing, typography, layout } from '../constants/styles';

export default function HistoryScreen() {
  const history = useSelector((state: RootState) => state.history);
  const exercises = useSelector((state: RootState) => state.exercises);

  const renderHistoryItem = ({ item }: { item: { id: string; exerciseId: string; completedAt: string; duration: number; repetitions: number } }) => {
    const exercise = exercises.find(ex => ex.id === item.exerciseId);
    const date = new Date(item.completedAt).toLocaleDateString();
    const time = new Date(item.completedAt).toLocaleTimeString();

    return (
      <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <Text style={styles.exerciseName}>{exercise?.name || 'Unknown Exercise'}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <View style={styles.historyDetails}>
          <Text style={styles.detailText}>Time: {time}</Text>
          <Text style={styles.detailText}>Duration: {item.duration}s</Text>
          <Text style={styles.detailText}>Reps: {item.repetitions}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No exercises completed yet</Text>
          <Text style={styles.emptyStateSubText}>Complete your first exercise to see your history</Text>
        </View>
      ) : (
        <FlatList
          data={history.slice().reverse()}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.historyList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  historyList: {
    padding: spacing.md,
  },
  historyCard: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...layout.shadow.small,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  exerciseName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.black,
  },
  dateText: {
    fontSize: typography.sizes.sm,
    color: colors.grey.dark,
  },
  historyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.grey.medium,
    paddingTop: spacing.sm,
  },
  detailText: {
    fontSize: typography.sizes.xs,
    color: colors.grey.darker,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyStateText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  emptyStateSubText: {
    fontSize: typography.sizes.sm,
    color: colors.grey.dark,
    textAlign: 'center',
  },
});