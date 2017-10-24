import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Button from '../components/Button';

class Deck extends Component {
  toAddCard = (title) => {
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'NewQuestion',
      params: { title }
    }))
  };

  toStartQuiz = (title, questions) => {
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'Quiz',
      params: { title, questions }
    }))
  };

  render() {
    const { navigation, decks } = this.props;
    const deck = decks[navigation.state.params.title];

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.info}>{deck.questions.length} cards</Text>
        <Button text="Add Card" onPress={() => this.toAddCard(deck.title)} style={styles.addCardBtn} />
        <Button text="Start Quiz" onPress={() => this.toStartQuiz(deck.title, deck.questions)} style={styles.startQuizBtn} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 50
  },
  info: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    color: 'gray'
  },
  addCardBtn: {
    marginTop: 120,
    marginRight: 100,
    marginLeft: 100
  },
  startQuizBtn: {
    marginTop: 20,
    marginRight: 100,
    marginLeft: 100
  }
});

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(Deck)