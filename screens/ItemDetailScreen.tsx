import React, { Component } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { Text, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamsList } from '../types';
import { FoodItemDetail } from '../types';
import { getIpAddress } from '../utils';
import axios from 'axios';
import FoodItemsList from '../components/FoodItemsList';

type ItemDetailScreenRouteProp = RouteProp<HomeStackParamsList, 'ItemDetail'>;

type ItemDetailScreenProps = {
  route: ItemDetailScreenRouteProp;
};

type ItemDetailScreenState = {
  itemDetail: FoodItemDetail;
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
      itemDetail: [],
    };
  }

  //   componentDidMount() {
  //     const { route } = this.props;
  //     this.setState({ isLoading: true });
  //     const url =
  //       'http://' +
  //       getIpAddress() +
  //       ':3000/items/search/?searchString=' +
  //       route.params.searchString;

  //     axios
  //       .get(url)
  //       .then((response) => {
  //         this.setState({
  //           searchedItems: (response.data as unknown) as FoodItem[],
  //           isLoading: false,
  //         });
  //       })
  //       .catch((error) => console.log(error));
  //   }

  render() {
    const { route } = this.props;
    return (
      <ScreenContainer>
        <View>
          <Text>{route.params.item.food_name}</Text>
        </View>
      </ScreenContainer>
    );
  }
}
