/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';


import TestComponent from './src/TestComponent';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TestComponent id={1}/>
        <TestComponent id={2}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'center'
  }
});
