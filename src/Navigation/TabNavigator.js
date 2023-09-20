// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Reports, Profile } from '../Screens/Index';
import { View , Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReportsStack from './ReportsStack';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      title: '',
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let iconName2;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';


        } else if (route.name === 'Reports') {
          iconName = focused ? 'ios-list' : 'ios-list-outline';
        }

        else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }
        // You can return any component that you like here!
        return (
          <View>
            {/* <View style={{ flexDirection: 'row' }}> */}
            {/* <MaterialCommunityIconsstyle style={{ alignSelf: 'center' }} name={iconName2} size={size} color={color} /> */}
            <Ionicons name={iconName} size={size} color={color} style={{ alignSelf: 'center' }} />
            {/* </View> */}
            <Text style={{ color: color }}>{route.name}</Text>
          </View>

        )
      },
      tabBarActiveTintColor: 'yellow',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle : {backgroundColor: 'black', height: 60,},
      tabBarHideOnKeyboard: true,
       

    })}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
        headerShown: false,
        }

      }/>
      <Tab.Screen name="Reports" component={ReportsStack} 
        options={{
          headerShown: false,
          }}/>
      <Tab.Screen name="Profile" component={Profile} 
      options={{
        headerShown: false,
        }}/>
    </Tab.Navigator >
  );
};

export default TabNavigator;