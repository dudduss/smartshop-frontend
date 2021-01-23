import React, { Component } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import FoodItemsList from '../components/FoodItemsList';
import { MarkedFoodItem } from '../types';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  HomeStackParamsList,
  SearchResultsNavigationProp,
  ItemDetailNavigationProp,
} from '../types';
import { getIpAddress, convertToMarkedFoodItem } from '../utils';

type HomeScreenState = {
  markedItems: MarkedFoodItem[];
  searchString: string;
  isLoading: boolean;
  userId: number;
};

type HomeScreenProps = {
  navigation: SearchResultsNavigationProp | ItemDetailNavigationProp;
};

export default class HomeScreen extends Component<
  HomeScreenProps,
  HomeScreenState
> {
  constructor(props: HomeScreenProps) {
    super(props);

    this.state = {
      searchString: '',
      markedItems: [],
      isLoading: false,
      userId: 5, // This will update after authentication and be passed through the rest of the app (likely gets passed from login screen and saved to local device)
    };
  }

  updateSearch = (searchString: string) => {
    this.setState({ searchString });
  };

  componentDidMount() {
    const { userId } = this.state;

    this.setState({ isLoading: true });
    const route =
      'http://' + getIpAddress() + ':3000/markedItemsByUserId?userId=' + userId;

    axios
      .get(route)
      .then((response) => {
        const markedItems = response.data.map((data) =>
          convertToMarkedFoodItem(data)
        );

        this.setState({
          markedItems: markedItems,
          isLoading: false,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { navigation } = this.props;
    const { markedItems, searchString, userId } = this.state;

    return (
      <ScreenContainer>
        <SearchBar
          placeholder='Search Foods...'
          onChangeText={this.updateSearch}
          onSubmitEditing={() =>
            navigation.push('SearchResults', { searchString, userId })
          }
          value={searchString}
          lightTheme={true}
        />
        <Text style={styles.savedItemsHeader}> Your Saved Items </Text>
        <View>
          <FoodItemsList
            items={markedItems}
            navigation={navigation as ItemDetailNavigationProp}
            userId={userId}
          ></FoodItemsList>
        </View>
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
  savedItemsHeader: {
    alignItems: 'flex-start',
    padding: 15,
    fontSize: 20,
    fontWeight: '500',
  },
});
