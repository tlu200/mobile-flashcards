import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TextInput
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions'
import Button from '../components/Button';

class NewDeck extends Component {
  state = {
    input: ''
  };

  submit = () => {
    const { input } = this.state;
    
    saveDeckTitle(input);
    this.props.dispatch(addDeck(input));
    this.setState({input: ''});
    this.jumpToDeck(input);
  };

  jumpToDeck= (title) => {
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'Deck',
      params: { title }
    }))
  };

  render() {
    const { input } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          value={input}
          placeholder="Type the deck title"
          onChangeText={(input) => this.setState({ input })}
        />
        <Button text="Create Deck"
                onPress={this.submit}
                style={styles.submitBtn} />
      </KeyboardAvoidingView>
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
  title: {
    textAlign: 'center',
    fontSize: 40
  },
  input: {
    marginTop: 30,
    width: 300,
    height: 40,
    padding: 10,
    borderWidth: 2,
    borderColor: 'gainsboro',
  },
  submitBtn: {
    marginTop: 20
  }
});


export default connect()(NewDeck)