import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    findNodeHandle,
} from 'react-native';

const styles = StyleSheet.create({
    textInputContainer: {
      flex: 1,
      borderBottomColor: '#008080',
      borderBottomWidth: 3,
      justifyContent: 'flex-end',
      marginLeft: 30,
      marginRight: 30,
    },
    textInput: {
      height: 30,
    },
    label: {
      color: '#555',
    }
});


class TextField extends Component {
  constructor(props) {
      super(props);
  }

  render() {
  const {fields} = this.props;
  _fields = fields(this);
  return (
  <View style={styles.textInputContainer}>
    <Text style={styles.label}>{this.props.label}</Text>
    <TextInput
        {..._fields}
        style={styles.textInput}
    />
  </View>
)}
}
TextField.defaultProps = {
  label: 'noLabel',
};

export default TextField;
