import React, { Component } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamsList } from '../types';

type SearchResultsScreenRouteProp = RouteProp<
  HomeStackParamsList,
  'SearchResults'
>;

type SearchResultsScreenProps = {
  route: SearchResultsScreenRouteProp;
};

export default class SearchResultsScreen extends Component<
  SearchResultsScreenProps,
  {}
> {
  render() {
    const { route } = this.props;
    return (
      <ScreenContainer>
        <Text> {route.params.searchString} </Text>
      </ScreenContainer>
    );
  }
}
