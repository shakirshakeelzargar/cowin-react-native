/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  CheckAvailability,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  SearchSlots,
} from './src/screens'

import { setValue, getValue } from './src/DataStore/Storage'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen
            name="CheckAvailability"
            component={CheckAvailability}
          />
          <Stack.Screen name="SearchSlots" component={SearchSlots} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
