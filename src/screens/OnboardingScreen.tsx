import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { colors, spacing, typography, layout } from '../constants/styles';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const steps = [
    {
      title: 'Welcome to Kegel Trainer',
      description: 'Your personal guide to strengthening pelvic floor muscles and improving overall health.',
    },
    {
      title: 'Benefits of Kegel Exercises',
      description: '• Improve bladder control\n• Enhance sexual function\n• Support pelvic organ stability\n• Aid in pregnancy and postpartum recovery\n• Prevent urinary incontinence',
    },
    {
      title: 'How to Do Kegel Exercises',
      description: 'To identify your pelvic floor muscles, try stopping urination midstream. These are your target muscles.\n\nProper technique:\n1. Empty your bladder\n2. Contract pelvic floor muscles\n3. Hold for 3-5 seconds\n4. Relax for 3-5 seconds\n5. Repeat 10-15 times',
    },
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{steps[currentStep].title}</Text>
        <Text style={styles.description}>{steps[currentStep].description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentStep && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: typography.sizes.md,
    color: colors.grey.dark,
    textAlign: 'center',
  },
  footer: {
    width: width - spacing.xl * 2,
    paddingBottom: spacing.lg,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: layout.borderRadius.circle,
    backgroundColor: colors.grey.medium,
    marginHorizontal: spacing.xs,
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
    width: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: layout.borderRadius.xl,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
});
