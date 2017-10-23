import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class DeckCard extends Component {
  render() {
    const { title, cardsNum, onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View>
          <Text>Title: {title}, {cardsNum} cards</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default DeckCard;