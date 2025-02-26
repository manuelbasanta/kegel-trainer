import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { colors, spacing, typography, layout } from '../constants/styles';

export default function EducationScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What are Kegel Exercises?</Text>
        <Text style={styles.text}>
          Kegel exercises strengthen the pelvic floor muscles, which support the bladder, bowel, and uterus in women, and the bladder and bowel in men. These exercises were developed by Dr. Arnold Kegel in the 1940s.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Benefits for Women</Text>
        <Text style={styles.bulletPoint}>• Prevent and treat urinary incontinence</Text>
        <Text style={styles.bulletPoint}>• Strengthen pelvic muscles during pregnancy and after childbirth</Text>
        <Text style={styles.bulletPoint}>• Improve sexual health and sensation</Text>
        <Text style={styles.bulletPoint}>• Support pelvic organ stability</Text>
        <Text style={styles.bulletPoint}>• Reduce risk of pelvic organ prolapse</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Benefits for Men</Text>
        <Text style={styles.bulletPoint}>• Improve bladder control</Text>
        <Text style={styles.bulletPoint}>• Aid recovery after prostate surgery</Text>
        <Text style={styles.bulletPoint}>• Enhance sexual function</Text>
        <Text style={styles.bulletPoint}>• Prevent premature ejaculation</Text>
        <Text style={styles.bulletPoint}>• Support overall pelvic health</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to Do Kegel Exercises</Text>
        <Text style={styles.subTitle}>Finding the Right Muscles</Text>
        <Text style={styles.text}>
          To identify your pelvic floor muscles, try to stop urination in midstream. The muscles you use to do this are your pelvic floor muscles. (Don't make a habit of starting and stopping your urine stream as this can harm bladder function).
        </Text>

        <Text style={styles.subTitle}>Proper Technique</Text>
        <Text style={styles.text}>
          1. Empty your bladder before starting
        </Text>
        <Text style={styles.text}>
          2. Contract your pelvic floor muscles
        </Text>
        <Text style={styles.text}>
          3. Hold the contraction for 3-5 seconds (longer as you get stronger)
        </Text>
        <Text style={styles.text}>
          4. Relax for 3-5 seconds
        </Text>
        <Text style={styles.text}>
          5. Repeat 10-15 times per session
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Important Tips</Text>
        <Text style={styles.bulletPoint}>• Don't hold your breath</Text>
        <Text style={styles.bulletPoint}>• Don't tighten your stomach, thigh, or buttock muscles</Text>
        <Text style={styles.bulletPoint}>• Don't overdo it - this can lead to straining</Text>
        <Text style={styles.bulletPoint}>• Be consistent with your exercises</Text>
        <Text style={styles.bulletPoint}>• Practice at different positions (lying, sitting, standing)</Text>
      </View>

      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>When to Expect Results</Text>
        <Text style={styles.text}>
          With consistent practice, you may notice improvements in 4-6 weeks. However, everyone is different, and it may take longer to see significant changes. The key is to make kegel exercises a regular part of your daily routine.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    marginVertical: spacing.sm,
    marginHorizontal: spacing.md,
    borderRadius: layout.borderRadius.md,
    ...layout.shadow.small,
  },
  lastSection: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.black,
    marginBottom: spacing.md,
  },
  subTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.black,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  text: {
    fontSize: typography.sizes.md,
    color: colors.grey.dark,
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  bulletPoint: {
    fontSize: typography.sizes.md,
    color: colors.grey.dark,
    lineHeight: 24,
    marginBottom: spacing.sm,
    paddingLeft: spacing.xs,
  },
});