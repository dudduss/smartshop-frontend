import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ActionButtonProps = {
  buttonText: string;
};

export default class ActionButton extends Component<ActionButtonProps> {
  constructor(props: ActionButtonProps) {
    super(props);
  }

  render() {
    const { buttonText } = this.props;
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}> {buttonText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#2AD478',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
