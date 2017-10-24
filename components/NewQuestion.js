import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { addCardToDeck } from '../utils/api';
import { addCard } from '../actions'
import Button from '../components/Button';
import { NavigationActions } from 'react-navigation';

class NewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  };

  submit = () => {
    const title = this.props.navigation.state.params.title;
    const { question, answer } = this.state;
    const card = { question, answer};

    addCardToDeck(title, card);
    this.props.dispatch(addCard(title, card));
    this.setState({question: '', answer: ''});
    this.toDeck();
  };

  toDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          style={styles.input}
          value={question}
          placeholder="Type the question"
          onChangeText={(question) => this.setState({ question })}
        />
        <TextInput
          style={styles.input}
          value={answer}
          placeholder="Type the answer"
          onChangeText={(answer) => this.setState({ answer })}
        />
        <Button text="Submit"
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
    justifyContent: 'flex-start',
    paddingTop: 100
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

export default connect()(NewQuestion)