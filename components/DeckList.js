import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
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

  renderDeckCard = ({ item }) => {
    return (
      <DeckCard
        title={item.title}
        cardsNum={item.questions.length}
        onPress={() => this.props.navigation.navigate(
          'Deck',
          { title: item.title}
        )}
      />
    );
  };

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />
    }

    if (!decks || !Object.keys(decks).length) {
      return (
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <Text style={{fontSize: 40, textAlign: 'center'}}>
            There is no deck yet
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(decks)}
          renderItem={this.renderDeckCard}
          keyExtractor={(item) => item.title}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
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