import React, { Component } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { Text, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import {
  HomeStackParamsList,
  ItemDetailNavigationProp,
  FoodItem,
} from '../types';
import { getIpAddress } from '../utils';
import axios from 'axios';
import FoodItemsList from '../components/FoodItemsList';
import { StackNavigationProp } from '@react-navigation/stack';

type SearchResultsScreenRouteProp = RouteProp<
  HomeStackParamsList,
  'SearchResults'
>;

type SearchResultsScreenProps = {
  route: SearchResultsScreenRouteProp;
  navigation: ItemDetailNavigationProp;
};

type SearchResultsScreenState = {
  searchedItems: FoodItem[];
  isLoading: boolean;
};

export default class SearchResultsScreen extends Component<
  SearchResultsScreenProps,
  SearchResultsScreenState
> {
  constructor(props: SearchResultsScreenProps) {
    super(props);

    this.state = {
      isLoading: false,
      searchedItems: [],
    };
  }

  componentDidMount() {
    const { route } = this.props;
    this.setState({ isLoading: true });
    const url =
      'http://' +
      getIpAddress() +
      ':3000/items/search/?searchString=' +
      route.params.searchString;

    axios
      .get(url)
      .then((response) => {
        this.setState({
          searchedItems: (response.data as unknown) as FoodItem[],
          isLoading: false,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { searchedItems } = this.state;
    const { navigation, route } = this.props;
    const userId = route.params.userId;
    return (
      <ScreenContainer>
        <View>
          <FoodItemsList
            items={searchedItems}
            navigation={navigation}
            userId={userId}
          ></FoodItemsList>
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
});
