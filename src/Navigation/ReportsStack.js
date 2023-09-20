// src/navigation/ReportsStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Reports, PersonalSafe, ECDSafe, CostReport , MasterData } from '../Screens/Index';

const Stack = createStackNavigator();

const ReportsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#242526',
            height: 50,
            
        },
      }}
    >
      <Stack.Screen name="Reports" component={Reports} options={{headerShown:false}} />
      <Stack.Screen name="Personal Safe" component={PersonalSafe} />
      <Stack.Screen name="Cost Report" component={CostReport} />
      <Stack.Screen name="Master Data" component={MasterData} />

    </Stack.Navigator>
  );
};

export default ReportsStack;