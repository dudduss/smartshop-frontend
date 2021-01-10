import React, { FC } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { FoodItem } from '../interfaces';
import StarRating from 'react-native-star-rating';

export function FoodItemView(props: FoodItemProps) {
  const { item } = props;
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.foodNameText}>{item.name}</Text>
        <Text style={styles.brandNameText}>by {item.brandName}</Text>
        <View style={styles.ratingContainer}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={item.rating}
            fullStarColor={'#2AD478'}
            emptyStarColor={'#2AD478'}
            starSize={30}
          ></StarRating>
          <Text style={styles.numReviewsText}>({item.numReviews} reviews)</Text>
        </View>
      </View>
    </View>
  );
}

interface FoodItemProps {
  item: FoodItem;
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
