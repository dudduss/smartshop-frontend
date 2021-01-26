import React, { Component, PureComponent } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { getIpAddress } from '../utils';
import axios from 'axios';
import {
  FoodItem,
  ItemDetailNavigationProp,
  RootStackParamsList,
} from '../types';
import { RouteProp } from '@react-navigation/native';

type BarcodeScannerScreenState = {
  didScan: boolean;
  hasPermission?: boolean;
};

type BarcodeScannerScreenRouteProp = RouteProp<
  RootStackParamsList,
  'BarcodeScanner'
>;

type BarcodeScannerScreenProps = {
  route: BarcodeScannerScreenRouteProp;
  navigation: ItemDetailNavigationProp;
};

export default class BarcodeScannerScreen extends PureComponent<
  BarcodeScannerScreenProps,
  BarcodeScannerScreenState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      didScan: false,
    };
  }

  handleBarCodeScanned = ({ type, data }) => {
    const { didScan } = this.state;
    const { route, navigation } = this.props;
    const userId = route.params.userId;

    if (!didScan) {
      this.setState({
        didScan: true,
      });
      const getItemByUpcUrl =
        'http://' + getIpAddress() + ':3000/items/searchByUpc/?upc=' + data;

      axios
        .get(getItemByUpcUrl)
        .then((response) => {
          const item = (response.data as unknown) as FoodItem;

          navigation.push('ItemDetail', { item, userId });

          return;
        })
        .catch((error) => console.log(error));
    }
  };

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === 'granted' });
  }

  render() {
    const { didScan, hasPermission } = this.state;

    this.props.navigation.addListener('focus', () => {
      this.setState({
        didScan: false,
      });
    });

    if (hasPermission == null) {
      return (
        <View style={styles.container}>
          <Text> Please grant camera permission to scan </Text>
        </View>
      );
    }

    if (hasPermission == false) {
      return (
        <View style={styles.container}>
          <Text> Camera permission denied </Text>
        </View>
      );
    }

    if (hasPermission == true && didScan == false) {
      return (
        <View style={styles.container}>
          <Camera
            onBarCodeScanned={this.handleBarCodeScanned}
            style={{ height: '100%', width: '100%' }}
          ></Camera>
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
