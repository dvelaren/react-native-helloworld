/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './pages/HomeScreen';
import BleScreen from './pages/BleScreen';
import SettingsScreen from './pages/SettingsScreen';

/* Simulation Data */
import devices from './sample/devices.json';

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
            {() => <BleScreen devices={this.state.devices} addDevice={this.addDevice}/>}
          </Tab.Screen>
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

