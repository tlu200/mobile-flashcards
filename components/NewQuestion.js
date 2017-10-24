import React, { Component } from 'react';
import { View, Text } from 'react-native';

class NewQuestion extends Component {
  render() {
    const { navigation } = this.props;
    const title = navigation.state.params.title;

    return (
      <View>
        <Text>NewQuestion: title={title}</Text>
      </View>
    )
  }
}

export default NewQuestion;