import React from 'react';
import { ScreenContainer } from 'react-native-screens';
import { Dimensions, StyleSheet, Text, Image, View } from 'react-native';
import { FoodItemList } from './components/FoodItemList';

export function Home() {
  return (
    <ScreenContainer>
      <Text style={styles.savedItemsHeader}> Your Saved Items </Text>
      <View>
        <FoodItemList></FoodItemList>
      </View>
    </ScreenContainer>
  );
}

export function Profile() {
  return (
    <ScreenContainer>
      <Text> Profile Screen baby </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  savedItemsHeader: {
    alignItems: 'flex-start',
    padding: 15,
    fontSize: 20,
    fontWeight: '500',
  },
});
