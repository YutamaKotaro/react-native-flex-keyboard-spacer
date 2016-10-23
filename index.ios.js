/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import App from './src/app'
import {
   AppRegistry
} from 'react-native'

class formKeySpace extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('formKeySpace', () => formKeySpace);
