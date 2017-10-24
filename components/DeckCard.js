import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class DeckCard extends Component {
  render() {
    const { title, cardsNum, onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.info}>{cardsNum} cards</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    height: 100,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    color: 'dimgrey',
    marginTop: 20
  },
  info: {
    textAlign: 'center',
    fontSize: 12,
    color: 'gray'
  }
});

export default DeckCard;