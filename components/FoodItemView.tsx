import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { FoodItem, MarkedFoodItem } from '../interfaces';
import StarRating from 'react-native-star-rating';

interface FoodItemViewProps {
  item: MarkedFoodItem | FoodItem;
}

export default class FoodItemView extends Component<FoodItemViewProps> {
  constructor(props: FoodItemViewProps) {
    super(props);
  }

  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <Image source={{ uri: item.image_url }} style={styles.foodImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.foodNameText}>{item.food_name}</Text>
          <Text style={styles.brandNameText}>by {item.brand_name}</Text>
          <View style={styles.ratingContainer}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={item.rating}
              fullStarColor={'#2AD478'}
              emptyStarColor={'#2AD478'}
              starSize={30}
            ></StarRating>
            <Text style={styles.numReviewsText}>
              ({item.num_reviews} {item.num_reviews == 1 ? 'review' : 'reviews'}
              )
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  foodNameText: {
    fontSize: 18,
    fontWeight: '400',
    flexDirection: 'row',
  },
  brandNameText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '300',
  },
  foodImage: {
    margin: 10,
    height: 100,
    width: 100,
    flexDirection: 'row',
  },
  starRatingItem: {
    height: 30,
  },
  container: {
    flexDirection: 'row',
  },
  infoContainer: {
    marginTop: 10,
    marginLeft: 5,
  },
  ratingContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  numReviewsText: {
    marginLeft: 5,
    marginTop: 5,
  },
});
