import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/styles';
import { LinearGradient } from 'expo-linear-gradient';

// Import screens (we'll create these next)
import HomeScreen from '../screens/HomeScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import HistoryScreen from '../screens/HistoryScreen';
import StatsScreen from '../screens/StatsScreen';
import EducationScreen from '../screens/EducationScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

export type RootStackParamList = {
  Home: undefined;
  Exercise: { exerciseId: string };
  History: undefined;
  Stats: undefined;
  Education: undefined;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('hasCompletedOnboarding').then(value => {
      setIsFirstLaunch(value === null);
    });
  }, []);

  const headerBackground = () => (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isFirstLaunch ? 'Onboarding' : 'Home'}
        screenOptions={{
          headerBackground: headerBackground,
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: undefined
        }}
      >
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Kegel Trainer' }}
        />
        <Stack.Screen 
          name="Exercise" 
          component={ExerciseScreen} 
          options={{ title: 'Exercise' }} 
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{ title: 'Exercise History' }} 
        />
        <Stack.Screen 
          name="Stats" 
          component={StatsScreen} 
          options={{ title: 'Your Progress' }} 
        />
        <Stack.Screen 
          name="Education" 
          component={EducationScreen} 
          options={{ title: 'Learn About Kegels' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}