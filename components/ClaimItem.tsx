import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ClaimItemProps = {
  claim: string;
};

export default class ClaimItem extends Component<ClaimItemProps> {
  constructor(props: ClaimItemProps) {
    super(props);
  }

  render() {
    const { claim } = this.props;
    return (
      <View style={styles.claimContainer}>
        <Text style={styles.claimText}> {claim}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  claimContainer: {
    backgroundColor: '#C1F3D8',
    marginHorizontal: 5,
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderRadius: 5,
  },
  claimText: {
    opacity: 0.6,
    fontSize: 14,
  },
});
