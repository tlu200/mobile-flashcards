import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Button from '../components/Button';

class Quiz extends Component {
  state = {
    currentQuestion: 0,
    correctAnswers: 0,
    showAnswer: false,
    resultPage: false
  };

  toggleAnswer = () => {
    this.setState({showAnswer: !this.state.showAnswer});
  };

  answer = (correct, isLastQuestion) => {
    if (isLastQuestion) {
      this.setState({
        correctAnswers: this.state.correctAnswers + (correct ? 1 : 0),
        resultPage: true
      });
    } else {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
        correctAnswers: this.state.correctAnswers + (correct ? 1 : 0),
        showAnswer: false
      });
    }
  };

  startOver = () => {
    this.setState({
      currentQuestion: 0,
      correctAnswers: 0,
      showAnswer: false,
      resultPage: false
    });
  };

  backToDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  render() {
    const { navigation } = this.props;
    const { questions } = navigation.state.params;
    const { currentQuestion, showAnswer, resultPage, correctAnswers } = this.state;
    const isLastQuestion = (currentQuestion + 1) >= questions.length;

    if (!questions || questions.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.info}>This a an empty deck</Text>
        </View>
      );
    }

    if (resultPage) {
      return (
        <View style={styles.container}>
          <Text style={styles.resultText}>
            You answered {correctAnswers} of {questions.length} ({correctAnswers*100/questions.length}%) questions correctly!
          </Text>
          <Button text="Start over" style={styles.startOverBtn} onPress={this.startOver} />
          <Button text="Back to Deck" style={styles.backBtn} onPress={this.backToDeck} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.progress}>{currentQuestion + 1}/{questions.length}</Text>
        <Text style={styles.question}>{questions[currentQuestion].question}</Text>
        <Button text="Answer" style={styles.answerBtn} textStyle={{color: 'red'}} onPress={this.toggleAnswer} />
        {showAnswer && <Text style={styles.answer}>{questions[currentQuestion].answer}</Text>}
        <Button text="Correct" style={styles.correctBtn} onPress={() => this.answer(true, isLastQuestion)} />
        <Button text="Incorrect" style={styles.incorrectBtn} onPress={() => this.answer(false, isLastQuestion)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  progress: {
    fontSize: 20,
    margin: 10
  },
  question: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 100
  },
  answerBtn: {
    backgroundColor: 'transparent',
    marginLeft: 120,
    marginRight: 120,
  },
  answer: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20
  },
  correctBtn: {
    backgroundColor: 'green',
    marginLeft: 100,
    marginRight: 100,
    marginTop: 100
  },
  incorrectBtn: {
    backgroundColor: 'red',
    marginLeft: 100,
    marginRight: 100,
    marginTop: 20
  },
  resultText: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 100
  },
  startOverBtn: {
    marginTop: 100,
  },
  backBtn: {
    marginTop: 20,
  },
  info: {
    textAlign: 'center',
    fontSize: 40,
    marginTop: 150
  }
});

export default Quiz;