import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import BarcodeScannerScreen from './screens/BarcodeScannerScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeStackParamsList, RootStackParamsList } from './types';
import ItemDetailScreen from './screens/ItemDetailScreen';
import WriteReviewScreen from './screens/WriteReviewScreen';
import { Button, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const HomeStack = createStackNavigator<HomeStackParamsList>();
const RootStack = createStackNavigator<RootStackParamsList>();
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
          headerBackTitle: ' ',
        }}
      >
        <HomeStack.Screen
          name='Home'
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.push('BarcodeScanner')}
              >
                <Image
                  style={styles.headerImage}
                  source={require('./assets/barcode_scan.png')}
                ></Image>
              </TouchableOpacity>
            ),
          })}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name='BarcodeScanner'
          component={BarcodeScannerScreen}
          options={() => ({
            title: 'Scan an item',
          })}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name='SearchResults'
          component={SearchResultsScreen}
          options={({ route }) => ({
            title: "Results for '" + route.params.searchString + "'",
          })}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name='ItemDetail'
          component={ItemDetailScreen}
          options={({ route }) => ({
            title: route.params.item.food_name,
          })}
        ></HomeStack.Screen>
        {/* <HomeStack.Screen
          name='WriteReview'
          component={WriteReviewScreen}
          options={{ title: 'Review' }}
        ></HomeStack.Screen> */}
      </HomeStack.Navigator>
    );
  }
}

class RootStackScreen extends Component {
  render() {
    return (
      <RootStack.Navigator mode='modal'>
        <RootStack.Screen
          name='Home'
          component={HomeStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='WriteReview'
          component={WriteReviewScreen}
          options={{ title: 'Review', headerShown: false }}
        />
      </RootStack.Navigator>
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
            component={RootStackScreen}
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

const styles = StyleSheet.create({
  headerImage: {
    margin: 10,
    height: 32,
    width: 32,
  },
});
