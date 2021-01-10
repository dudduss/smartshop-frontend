import React, { Component } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import FoodItemView from './FoodItemView';
import { FoodItem } from '../interfaces';

interface FoodItemsListProps {
  items: FoodItem[];
}

export default class FoodItemsList extends Component<FoodItemsListProps> {
  constructor(props: FoodItemsListProps) {
    super(props);
  }

  render() {
    const { items } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={({ item }) => <FoodItemView item={item}></FoodItemView>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
