/* eslint react/prefer-stateless-function:"off" */

import React, { Component, PropTypes } from 'react';
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

class TextField extends Component {
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
TextField.propTypes = {
    style: PropTypes.any,
    label: PropTypes.any,
    spacerProps: PropTypes.func,
};

export default TextField;
