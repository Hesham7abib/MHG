// src/navigation/MyStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StartUp, SignIn, SignUp, ResetPasswordScreen, MasterData } from '../Screens/Index';
import TabNavigator from './TabNavigator';
import ReportsStack from './ReportsStack';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Start Up" component={StartUp} />
      <Stack.Screen
        name="Log In"
        component={SignIn}
        options={{
          headerShown: true,
          headerTitle: 'Sign In',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#242526',
          },
        }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUp}
        options={{
          headerShown: true,
          headerTitle: 'Create Account',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#242526',

          },
        }}
      />
      <Stack.Screen
        name="Reset Password"
        component={ResetPasswordScreen}
        options={{
          headerShown: true,
          headerTitle: 'Reset Password',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#242526',
          },
        }}
      />
      <Stack.Screen name="Tab Navigator" component={TabNavigator} />
      <Stack.Screen name="Reports Stack" component={ReportsStack} />

    </Stack.Navigator>
  );
};

export default MyStack;
