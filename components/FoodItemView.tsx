import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { FoodItem, MarkedFoodItem, Review } from '../types';
import { getIpAddress, getItemNumReviews, getItemRating } from '../utils';
import axios from 'axios';
import StarRating from 'react-native-star-rating';

type FoodItemViewProps = {
  item: MarkedFoodItem | FoodItem;
};

type FoodItemViewState = {
  numReviews: number;
  rating: number;
};

export default class FoodItemView extends Component<
  FoodItemViewProps,
  FoodItemViewState
> {
  constructor(props: FoodItemViewProps) {
    super(props);

    this.state = {
      numReviews: 0,
      rating: 0,
    };
  }

  componentDidMount() {
    const { item } = this.props;

    const reviewsUrl =
      'http://' + getIpAddress() + ':3000/reviewsByItemId?itemId=' + item.id;

    axios
      .get(reviewsUrl)
      .then((response) => {
        const itemReviews = (response.data as unknown) as Review[];

        this.setState({
          numReviews: getItemNumReviews(itemReviews),
          rating: getItemRating(itemReviews),
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { item } = this.props;
    const { rating, numReviews } = this.state;
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
              rating={rating}
              fullStarColor={'#2AD478'}
              emptyStarColor={'#2AD478'}
              starSize={30}
            ></StarRating>
            <Text style={styles.numReviewsText}>
              ({numReviews} {numReviews == 1 ? 'review' : 'reviews'})
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
