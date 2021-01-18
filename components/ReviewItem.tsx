import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { Review } from '../types';
import StarRating from 'react-native-star-rating';

interface ReviewItemProps {
  review: Review;
}

export default class ReviewItem extends Component<ReviewItemProps> {
  constructor(props: ReviewItemProps) {
    super(props);
  }

  render() {
    const { review } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.reviewerInfoContainer}>
          <Image
            source={
              review.profile_picture_url
                ? { uri: review.profile_picture_url }
                : require('../assets/empty_profile.png')
            }
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.nameText}>
              {review.first_name +
                ' ' +
                review.last_name[0].toUpperCase() +
                '.'}
            </Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={review.rating}
              fullStarColor={'#2AD478'}
              emptyStarColor={'#2AD478'}
              starSize={20}
            ></StarRating>
          </View>
        </View>
        <Text style={styles.contentText}>{review.content}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  reviewerInfoContainer: {
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '400',
    flexDirection: 'row',
    marginBottom: 5,
  },
  profileImage: {
    margin: 10,
    width: 40,
    height: 40,
  },
  starRatingItem: {
    height: 30,
  },
  infoContainer: {
    marginTop: 10,
    marginLeft: 5,
  },
  ratingContainer: {
    marginTop: 5,
    flexDirection: 'row',
  },
  contentText: {
    marginRight: 10,
    marginTop: 5,
  },
});
