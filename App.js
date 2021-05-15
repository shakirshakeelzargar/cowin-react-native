/* eslint-disable no-unused-vars */
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import { theme } from './src/core/theme'
import NavBar from './src/components/NavBar'
import { name as appName } from './app.json'
import {
  CertificateDownload,
  StartScreen,
  CheckAvailability,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  ViewPdf,
  SearchSlots,
  WebViewRegistration,
  DeveloperScreen,
  UpdateScreen,
  ForceUpdate,
} from './src/screens'

const Drawer = createDrawerNavigator()
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App))
export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="StartScreen"
          drawerContent={(props) => <NavBar navigation={props.navigation} />}
        >
          <Drawer.Screen name="StartScreen" component={StartScreen} />
          <Drawer.Screen name="UpdateScreen" component={UpdateScreen} />
          <Drawer.Screen name="SearchSlots" component={SearchSlots} />
          <Drawer.Screen name="LoginScreen" component={LoginScreen} />
          <Drawer.Screen name="DeveloperScreen" component={DeveloperScreen} />
          <Drawer.Screen
            name="ForceUpdate"
            component={ForceUpdate}
            options={{
              swipeEnabled: false,
            }}
          />
          <Drawer.Screen
            name="CertificateDownload"
            component={CertificateDownload}
          />
          <Drawer.Screen
            name="CheckAvailability"
            component={CheckAvailability}
          />
          <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
          <Drawer.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Drawer.Screen name="Dashboard" component={Dashboard} />
          <Drawer.Screen name="ViewPdf" component={ViewPdf} />
          <Drawer.Screen
            name="WebViewRegistration"
            component={WebViewRegistration}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
