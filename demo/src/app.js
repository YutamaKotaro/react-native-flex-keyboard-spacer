import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native'
import TextField from './TextField';
import KeyBoardSpacer from './keyBoardSpacer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 30,
    },
    formContainer: {
        flex: 2,
    },
    switchSpacer: {
      flex: 1,
      top: -100,
    },
});

const TextFieldContainer = (prop) => (
    <View style={styles.formContainer}>
      <TextField label={prop.label} fields={prop.fields} / >
    </View>
);

const App = (prop) => {
  const { fields } = prop;
  return (
    <View style={styles.container}>
        <TextFieldContainer fields={fields[0]} label="form1" />
        <TextFieldContainer  fields={fields[1]} label="form2" />
        <TextFieldContainer  fields={fields[2]} label="form3" />
        <TextFieldContainer  fields={fields[3]} label="form4" />
    </View>
);}

export default KeyBoardSpacer({
  numbers: 4,
})(App);
