import React, { Component } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { Text, StyleSheet, View, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamsList, ItemDetailNavigationProp } from '../types';
import { getIpAddress } from '../utils';
import axios from 'axios';
import FoodItemsList from '../components/FoodItemsList';
import { StackNavigationProp } from '@react-navigation/stack';
import StarRating from 'react-native-star-rating';
import { TextInput } from 'react-native-gesture-handler';

type WriteReviewScreenRouteProp = RouteProp<HomeStackParamsList, 'WriteReview'>;

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

  postOrPatchReview() {
    const { route } = this.props;
    const { starCount, content } = this.state;
    const review = route.params.review;

    const url = 'http://' + getIpAddress() + ':3000/reviews';

    console.log('review: ', review);

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
  }

  render() {
    const { navigation } = this.props;
    const { starCount, content } = this.state;

    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            this.postOrPatchReview();
            navigation.goBack();
          }}
          title='Submit'
          color='#fff'
        />
      ),
    });

    return (
      <ScreenContainer>
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
  searchResultsHeader: {
    alignItems: 'flex-start',
    padding: 15,
    fontSize: 20,
    fontWeight: '500',
  },
  ratingContainer: {
    marginHorizontal: 50,
    marginVertical: 20,
  },
  contentContainer: {
    marginHorizontal: 30,
    fontSize: 16,
  },
});
