import React from 'react';
import AppLoading from 'expo-app-loading'

import { useFonts } from 'expo-font'
import {Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter'
import {Rajdhani_500Medium, Rajdhani_700Bold} from '@expo-google-fonts/rajdhani'
import { StatusBar, LogBox } from 'react-native'

import { Background } from './src/components/background';
import { Routes } from './src/routes';
import { AuthContextProvider } from './src/hooks/auth.context';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
      <AuthContextProvider>
        <Background>
          <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
          />
          {/* <SignIn />  */}
          <Routes />
        </Background>
      </AuthContextProvider>
  );
}

