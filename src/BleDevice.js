import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native';

export default class BleDevice extends Component {
  render() {
    const { device } = this.props;
    console.log(this.props);
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{device.name || 'Unnamed'}</Text>
        <Text>{device.id}</Text>
        <Text>RSSI: {device.rssi}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 12,
    color: '#007bff'
  },
});