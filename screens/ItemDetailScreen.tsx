import React, { Component } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { Text, StyleSheet, View, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamsList } from '../types';
import { FoodItemDetail } from '../types';
import { getIpAddress } from '../utils';
import axios from 'axios';
import FoodItemsList from '../components/FoodItemsList';
import StarRating from 'react-native-star-rating';

type ItemDetailScreenRouteProp = RouteProp<HomeStackParamsList, 'ItemDetail'>;

type ItemDetailScreenProps = {
  route: ItemDetailScreenRouteProp;
};

type ItemDetailScreenState = {
  itemDetail?: FoodItemDetail;
  isLoading: boolean;
};

export default class ItemDetailScreen extends Component<
  ItemDetailScreenProps,
  ItemDetailScreenState
> {
  constructor(props: ItemDetailScreenProps) {
    super(props);

    this.state = {
      isLoading: false,
      itemDetail: undefined,
    };
  }

  componentDidMount() {
    const { route } = this.props;
    this.setState({ isLoading: true });
    const url =
      'http://' +
      getIpAddress() +
      ':3000/items/search/detail?nix_item_id=' +
      route.params.item.nix_item_id;

    axios
      .get(url)
      .then((response) => {
        this.setState({
          itemDetail: (response.data as unknown) as FoodItemDetail,
          isLoading: false,
        });
      })
      .catch((error) => console.log(error));

    // We also want to make requests to our "health endpoint" when that is ready + get reviews endpoint
  }

  render() {
    const { route } = this.props;
    const item = route.params.item;

    return (
      <ScreenContainer>
        <View>
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
                {item.num_reviews}{' '}
                {item.num_reviews == 1 ? 'review' : 'reviews'}
              </Text>
            </View>
          </View>
        </View>
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
  foodImage: {
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%',
    paddingTop: '40%',
  },
  foodNameText: {
    fontSize: 20,
    fontWeight: '400',
  },
  brandNameText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '300',
  },
  infoContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  ratingContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  numReviewsText: {
    marginLeft: 5,
    marginTop: 5,
  },
});
