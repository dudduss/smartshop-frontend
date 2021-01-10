import React from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { FoodItemView } from './FoodItemView';
import { FoodItem } from '../interfaces';

const foodItems: FoodItem[] = [
  {
    name: 'Chipotle Sauce',
    brandName: 'Bitchin',
    imageUrl:
      'https://nutritionix-api.s3.amazonaws.com/53e228999f8b88696d1be599.jpeg',
    rating: 3.0,
    numReviews: 2,
  },
];

export function FoodItemList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={foodItems}
        renderItem={({ item }) => <FoodItemView item={item}></FoodItemView>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
