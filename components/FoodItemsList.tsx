import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import FoodItemView from './FoodItemView';
import { FoodItem, MarkedFoodItem, ItemDetailNavigationProp } from '../types';

type FoodItemsListProps = {
  items: MarkedFoodItem[] | FoodItem[];
  navigation: ItemDetailNavigationProp;
  userId: number;
};

export default class FoodItemsList extends Component<FoodItemsListProps> {
  constructor(props: FoodItemsListProps) {
    super(props);
  }

  render() {
    const { items, navigation, userId } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => navigation.push('ItemDetail', { item, userId })}
            >
              <FoodItemView item={item}></FoodItemView>
            </TouchableHighlight>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
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
  list: {
    marginBottom: 10,
  },
});
