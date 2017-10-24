import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={[Platform.OS === 'ios' ? styles.iosSubmitBtn: styles.AndroidSubmitBtn, {marginTop: 20}]}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  );
}

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
        <SubmitBtn onPress={this.submit}></SubmitBtn>
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
  iosSubmitBtn: {
    backgroundColor: 'darkblue',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: 'darkblue',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  }
});


export default connect()(NewDeck)