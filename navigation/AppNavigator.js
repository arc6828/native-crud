import React from 'react';
import { createAppContainer, createSwitchNavigator,createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

const AuthStack = createStackNavigator({ 
  Login : LoginScreen , 
  Register : RegisterScreen , 
});

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,    
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  })
);


