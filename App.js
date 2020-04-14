/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Text
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TestComponent from './src/TestComponent';

const Stack = createStackNavigator();

function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TestComponent id={1} />
      <TestComponent id={2} />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </SafeAreaView>
  );
}

function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <TestComponent id={4} />
    </SafeAreaView>
  );
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitle: () => (
              <View style={styles.myStyle}>
                <FontAwesomeIcon icon={ faCoffee } color={'red'} size={ 24 } />
                <Text style={styles.text}>Home</Text>
              </View>
            ),
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}  
                title="Info"
                color='blue'
              />
            )
          }}>
          <Stack.Screen name="Home" component={Home} options={{title: 'My Home'}} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const navOptions = {
  headerStyle: {
    backGroundColor: '#f4511e'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'center'
  },
  myStyle: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    color: "blue"
  }
});
