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
  SafeAreaView,
  StyleSheet,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FloatingAction } from 'react-native-floating-action';
// import ActionButton from 'react-native-action-button';


import TestComponent from './src/TestComponent';
import BleDevice from './src/BleDevice';

/* Simulation Data */
import devices from './sample/devices.json';

const actions = [{
  text: 'Scan',
  icon: <Icon name={'ios-bluetooth'} size={24} color={'white'} />,
  name: 'bt_scan',
  position: 1
}];

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TestComponent id={1} />
      <TestComponent id={2} />
    </View>
  );
}

function BleScreen() {
  console.log(devices);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={devices}
        renderItem={({ item }) => <BleDevice device={item} />}
        keyExtractor={item => item.id}
      />
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          alert("Selected button: " + name);
        }}
        color={"tomato"}
      />
    </SafeAreaView>
  );
}

function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TestComponent id={4} />
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default class App extends Component {

  state = {
    devices: devices
  }

  addDevice = (id, name, rssi) => {
    const newDevice = {
      name: name || 'Undefined',
      id: id,
      rssi: rssi
    }
    this.setState({
      devices: [...this.state.devices, newDevice]
    })
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Bluetooth') {
                iconName = focused ? 'ios-bluetooth' : 'ios-bluetooth';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }

              return <Icon name={iconName} size={size} color={color} />
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray'
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Bluetooth">
            {() => <BleScreen devices={this.state.devices} />}
          </Tab.Screen>
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});
