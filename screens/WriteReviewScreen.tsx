import React, { Component } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { Text, StyleSheet, View, Button, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamsList, ItemDetailNavigationProp } from '../types';
import { getIpAddress } from '../utils';
import axios from 'axios';
import FoodItemsList from '../components/FoodItemsList';
import { StackNavigationProp } from '@react-navigation/stack';
import StarRating from 'react-native-star-rating';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import ActionButton from '../components/ActionButton';

type WriteReviewScreenRouteProp = RouteProp<RootStackParamsList, 'WriteReview'>;

type WriteReviewScreenProps = {
  route: WriteReviewScreenRouteProp;
  navigation: ItemDetailNavigationProp;
};

type WriteReviewScreenState = {
  starCount: number;
  content: string;
};

export default class WriteReviewScreen extends Component<
  WriteReviewScreenProps,
  WriteReviewScreenState
> {
  constructor(props: WriteReviewScreenProps) {
    super(props);

    const { route } = this.props;
    const review = route.params.review;
    this.state = {
      starCount: review ? review.rating : 0,
      content: review && review.content ? review.content : '',
    };
  }

  submitReview() {
    const { starCount, content } = this.state;

    if (starCount == 0) {
      alert('Rating must be at least 1');
      return;
    }

    if (content.length > 500) {
      alert('Your review is too long, try to shorten just a little bit.');
      return;
    }

    this.postOrPatchReview();
  }

  postOrPatchReview() {
    const { route, navigation } = this.props;
    const { starCount, content } = this.state;
    const review = route.params.review;

    const url = 'http://' + getIpAddress() + ':3000/reviews';

    if (review) {
      const body = {
        id: review.id,
        content,
        rating: starCount,
      };

      axios
        .patch(url, body)
        .then((response) => {})
        .catch((error) => console.log(error));
    } else {
      const body = {
        userId: route.params.userId,
        itemId: route.params.item.id,
        content,
        rating: starCount,
      };
      axios
        .post(url, body)
        .then((response) => {})
        .catch((error) => console.log(error));
    }

    navigation.goBack();
  }

  render() {
    const { navigation } = this.props;
    const { starCount, content } = this.state;

    return (
      <ScreenContainer>
        <View style={styles.headerContainer}>
          <TouchableHighlight
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={require('../assets/close.png')}
              style={styles.closeImage}
            />
          </TouchableHighlight>

          <Text style={styles.headerText}> Write your review </Text>
          <ActionButton
            buttonText='Submit'
            onPress={() => {
              this.submitReview();
            }}
          ></ActionButton>
        </View>
        <View style={styles.ratingContainer}>
          <StarRating
            maxStars={5}
            fullStarColor={'#2AD478'}
            emptyStarColor={'#2AD478'}
            rating={starCount}
            starSize={50}
            selectedStar={(rating) => this.setState({ starCount: rating })}
          ></StarRating>
        </View>
        <View>
          <TextInput
            multiline={true}
            value={content}
            onChangeText={(text) => this.setState({ content: text })}
            placeholder={
              'Let us know what you think! A great review can really help a future shopper!'
            }
            style={styles.contentContainer}
          ></TextInput>
        </View>
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
  closeImage: {
    width: 20,
    height: 20,
    marginTop: 10,
  },
  headerText: {
    paddingTop: 10,
    paddingRight: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  headerContainer: {
    marginTop: 40,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    marginHorizontal: 50,
    marginTop: 40,
  },
  contentContainer: {
    marginHorizontal: 30,
    marginTop: 20,
    fontSize: 16,
  },
});
