import React, { Component } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import FoodItemsList from '../components/FoodItemsList';
import { MarkedFoodItem } from '../interfaces';
import axios from 'axios';

interface HomeScreenState {
  markedItems: MarkedFoodItem[];
  searchString: string;
  isLoading: boolean;
}

export default class HomeScreen extends Component<{}, HomeScreenState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      searchString: '',
      markedItems: [],
      isLoading: false,
    };
  }

  updateSearch = (searchString: string) => {
    this.setState({ searchString });
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get('http://192.168.0.32:3000/markedItemsByUserId?userId=1')
      .then((response) => {
        this.setState({
          markedItems: (response.data as unknown) as MarkedFoodItem[],
          isLoading: false,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { markedItems, searchString } = this.state;
    return (
      <ScreenContainer>
        <SearchBar
          placeholder='Search Foods...'
          onChangeText={this.updateSearch}
          onSubmitEditing={() => console.log('searchString: ', searchString)}
          value={searchString}
          lightTheme={true}
        />

        <Text style={styles.savedItemsHeader}> Your Saved Items </Text>
        <View>
          <FoodItemsList items={markedItems}></FoodItemsList>
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
