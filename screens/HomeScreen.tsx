import React, { Component } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { StyleSheet, Text, View } from 'react-native';
import { FoodItemList } from '../components/FoodItemList';

export default class HomeScreen extends Component {
  render() {
    return (
      <ScreenContainer>
        <Text style={styles.savedItemsHeader}> Your Saved Items </Text>
        <View>
          <FoodItemList></FoodItemList>
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
