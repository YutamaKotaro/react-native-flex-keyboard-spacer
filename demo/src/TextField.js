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
    const { style, label, spacerProps } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput {...spacerProps(this)} style={styles.textInput} />
      </View>
    );
  }
}
