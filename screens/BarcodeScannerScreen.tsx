import React, { Component, PureComponent } from 'react';
import { ScreenContainer } from 'react-native-screens';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';

type BarcodeScannerScreenState = {
  didScan: boolean;
  hasPermission?: boolean;
};

export default class BarcodeScannerScreen extends PureComponent<
  {},
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

    if (!didScan) {
      alert('we got this data: ' + data + ' with this type ' + type);
    }

    this.setState({
      didScan: true,
    });
  };

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === 'granted' });
  }

  render() {
    const { didScan, hasPermission } = this.state;

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
      return <Text> You're done mista!</Text>;
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
