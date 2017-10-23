import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { AppLoading } from 'expo';

import { getDecks } from '../utils/api';
import DeckCard from '../components/DeckCard';

class DeckList extends Component {
  state = {
    ready: false
  };

  componentDidMount () {
    const { dispatch } = this.props;

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(({ decks }) => {
        this.setState(() => ({ready: true}));
      });
  }

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        {Object.keys(decks).map((title) => {
          const deck = decks[title];
          return (
            <DeckCard
              title={deck.title}
              cardsNum={deck.questions.length}
              key={deck.title}
              onPress={() => this.props.navigation.navigate(
                'Deck',
                { title: title}
              )}
            />
          );
        })}
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

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(DeckList)