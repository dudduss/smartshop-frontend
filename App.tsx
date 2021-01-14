import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeStackParamsList } from './types';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const HomeStack = createStackNavigator<HomeStackParamsList>();
const ProfileStack = createStackNavigator();

class HomeStackScreen extends Component {
  render() {
    return (
      <HomeStack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2AD478',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <HomeStack.Screen name='Home' component={HomeScreen}></HomeStack.Screen>
        <HomeStack.Screen
          name='SearchResults'
          component={SearchResultsScreen}
        ></HomeStack.Screen>
      </HomeStack.Navigator>
    );
  }
}

class ProfileStackScreen extends Component {
  render() {
    return (
      <ProfileStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2AD478',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <ProfileStack.Screen
          name='Profile'
          component={ProfileScreen}
        ></ProfileStack.Screen>
      </ProfileStack.Navigator>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tabs.Navigator tabBarOptions={{ activeTintColor: '#2AD478' }}>
          <Tabs.Screen
            name='Home'
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name='basket'
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tabs.Screen
            name='Profile'
            component={ProfileStackScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name='face-profile'
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    );
  }
}
