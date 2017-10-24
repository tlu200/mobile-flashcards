import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Quiz extends Component {
  render() {
    const { navigation } = this.props;
    const { title, questions } = navigation.state.params;

    return (
      <View>
        <Text>Quiz title={title}, questions={JSON.stringify(questions)}</Text>
      </View>
    )
  }
}

export default Quiz;