import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    borderBottomColor: '#008080',
    borderBottomWidth: 3,
  },
  label: {
    color: '#555',
  },
  textInput: {
    height: 30,
  },
});

export default class TextField extends Component {
  render() {
    const { style, label, fields } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput {...fields(this)} style={styles.textInput} />
      </View>
    );
  }
}
