import React, { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentListScreen from './src/screens/StudentListScreen';
import StudentDetailScreen from './src/screens/StudentDetailScreen';
import StudentFormScreen from './src/screens/StudentFormScreen';
import { updateLocale } from './src/i18n';
import { getLocales } from 'expo-localization';

const Stack = createNativeStackNavigator();

export default function App() {
  // Locale key to force re-render when device language changes on Android
  const [localeKey, setLocaleKey] = useState(getLocales()[0]?.languageCode || 'en');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        updateLocale();
        const currentCode = getLocales()[0]?.languageCode || 'en';
        setLocaleKey(currentCode);
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer key={localeKey}>
      <Stack.Navigator initialRouteName="StudentList">
        <Stack.Screen name="StudentList" component={StudentListScreen} />
        <Stack.Screen name="StudentDetail" component={StudentDetailScreen} />
        <Stack.Screen name="StudentForm" component={StudentFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
