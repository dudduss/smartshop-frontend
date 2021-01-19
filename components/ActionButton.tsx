import React, { Component } from 'react';
import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

type ActionButtonProps = {
  buttonText: string;
  onPress: (event: GestureResponderEvent) => void;
};

export default class ActionButton extends Component<ActionButtonProps> {
  constructor(props: ActionButtonProps) {
    super(props);
  }

  render() {
    const { buttonText, onPress } = this.props;
    return (
      <TouchableHighlight onPress={onPress}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}> {buttonText}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#2AD478',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
