import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class Deck extends Component {
  render() {
    const { title, navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text>{navigation.state.params.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Deck;