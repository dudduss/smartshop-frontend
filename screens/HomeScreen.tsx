import React, { Component } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { StyleSheet, Text, View } from 'react-native';
import FoodItemsList from '../components/FoodItemsList';
import { FoodItem } from '../interfaces';
import axios from 'axios';

const defaultMarkedItems: FoodItem[] = [];

interface HomeScreenState {
  markedItems: FoodItem[];
  isLoading: boolean;
}

export default class HomeScreen extends Component<{}, HomeScreenState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      markedItems: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get('http://192.168.0.32:3000/markedItemsByUserId?userId=1')
      .then((response) => {
        this.setState({
          markedItems: (response.data as unknown) as FoodItem[],
          isLoading: false,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { markedItems } = this.state;
    return (
      <ScreenContainer>
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
