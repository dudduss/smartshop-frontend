import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ClaimItem from './ClaimItem';
import { getRelevantClaims } from '../utils';

type ClaimsListProps = {
  claims: string[];
};

export default class ClaimsList extends Component<ClaimsListProps> {
  constructor(props: ClaimsListProps) {
    super(props);
  }

  render() {
    const { claims } = this.props;
    const itemRelevantClaims = getRelevantClaims(claims);

    return (
      <View style={styles.container}>
        <FlatList
          data={itemRelevantClaims}
          horizontal={true}
          renderItem={({ item }) => <ClaimItem claim={item}></ClaimItem>}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  list: {
    marginBottom: 10,
  },
});
