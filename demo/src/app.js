import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import TextField from './TextField';
import KeyBoardSpacer from './keyBoardSpacer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
});

const App = (prop) => {
  const { fields } = prop;
  return (
    <View style={styles.container}>
      <TextField fields={fields[0]} label="form1" style={{flex: 4}} />
      <TextField fields={fields[1]} label="form2" style={{flex: 3}} />
      <TextField fields={fields[2]} label="form3" style={{flex: 2}} />
      <TextField fields={fields[3]} label="form4" style={{flex: 1}} />
    </View>
  );
};

export default KeyBoardSpacer({
  numbers: 4,
})(App);
