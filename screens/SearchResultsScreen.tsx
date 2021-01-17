import React, { Component } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { Text, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamsList } from '../types';
import { FoodItem } from '../interfaces';
import { getIpAddress } from '../utils';
import axios from 'axios';
import FoodItemsList from '../components/FoodItemsList';

type SearchResultsScreenRouteProp = RouteProp<
  HomeStackParamsList,
  'SearchResults'
>;

type SearchResultsScreenProps = {
  route: SearchResultsScreenRouteProp;
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
    return (
      <ScreenContainer>
        <Text style={styles.searchResultsHeader}> Results </Text>
        <View>
          <FoodItemsList items={searchedItems}></FoodItemsList>
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
