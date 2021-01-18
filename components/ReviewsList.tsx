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
import { Review } from '../types';
import ReviewItem from './ReviewItem';

type ReviewsListProps = {
  reviews: Review[];
};

export default class ReviewsList extends Component<ReviewsListProps> {
  constructor(props: ReviewsListProps) {
    super(props);
  }

  render() {
    const { reviews } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem review={item}></ReviewItem>}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
          scrollEnabled={false}
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
