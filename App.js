import React from 'react';

import { StatusBar, LogBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from './src/contexts/auth';
import Routes from './src/routes';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#131313' barStyle='light-content' />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
