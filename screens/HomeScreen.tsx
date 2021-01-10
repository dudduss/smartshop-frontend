import React, { Component } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { StyleSheet, Text, View } from 'react-native';
import FoodItemsList from '../components/FoodItemsList';

export default class HomeScreen extends Component {
  render() {
    return (
      <ScreenContainer>
        <Text style={styles.savedItemsHeader}> Your Saved Items </Text>
        <View>
          <FoodItemsList></FoodItemsList>
        </View>
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
  savedItemsHeader: {
    alignItems: 'flex-start',
    padding: 15,
    fontSize: 20,
    fontWeight: '500',
  },
});
