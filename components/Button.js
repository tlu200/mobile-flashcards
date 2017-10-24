import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';

function Button ({ onPress, style, text }) {
  return (
    <TouchableOpacity
      style={[Platform.OS === 'ios' ? styles.iosSubmitBtn: styles.AndroidSubmitBtn, style]}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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

export default Button;

