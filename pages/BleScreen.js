import React, { Component } from 'react';
import { Platform } from 'react-native';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { 
  SafeAreaView, 
  StyleSheet,
  FlatList
} from 'react-native';

import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons'
import BLEAdvertiser from 'react-native-ble-advertiser';


/* Import Components */
import BleDevice from '../src/BleDevice';

const actions = [{
  text: 'Scan',
  icon: <Icon name={'ios-bluetooth'} size={24} color={'white'} />,
  name: 'bt_scan',
  position: 1
}];


export default class BleScreen extends Component {
  state = {
    devicesFound: [],
    isLogging: false
  }

  addDevice(_uuid, _name, _rssi) {
    const newDevice = {
      id: _uuid,
      name: _name || 'undefined',
      rssi: _rssi
    };
    console.log("Added device:", newDevice);
    this.setState({
      devicesFound: [...this.state.devicesFound, newDevice]
    });
  }

  isValidUUID(uuid) {
    if (!uuid)return false;
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
  }

  componentDidMount(){
    console.log("BLE Advertiser", BLEAdvertiser);
    BLEAdvertiser.setCompanyId(0x7777); 
    const eventEmitter = Platform.select({
      ios: new NativeEventEmitter(NativeModules.BLEAdvertiser),
      android: new NativeEventEmitter(NativeModules.BLEAdvertiser),
    });
    eventEmitter.addListener('onDeviceFound', (event) => {
      console.log('onDeviceFound', event);
      if (event.serviceUuids) {
        for(let i=0; i< event.serviceUuids.length; i++){
          if (this.isValidUUID(event.serviceUuids[i]))
            this.addDevice(event.serviceUuids[i], event.deviceName, event.rssi)   
        }
      }
    });
  }

  start() {
    console.log("Starting Advertising");
    BLEAdvertiser.broadcast("44bb3538-e3be-4824-849e-802143c63283", [12,23,56])
    .then((sucess) => {
      console.log("Adv Successful", sucess);
    }).catch(error => {
      console.log("Adv Error", error); 
    });
    
    console.log("Starting Scanner");
    BLEAdvertiser.scan([12,23,56], {})
    .then((sucess) => {
      console.log("Scan Successful", sucess);
    }).catch(error => {
      console.log("Scan Error", error); 
    });

    this.setState({
      isLogging: true,
    });
  }

  stop(){
    console.log("Stopping Broadcast");
    BLEAdvertiser.stopBroadcast()
      .then((sucess) => {
        console.log("Stop Broadcast Successful", sucess);
      }).catch(error => {
        console.log("Stop Broadcast Error", error); 
      });

    console.log("Stopping Scanning");
    BLEAdvertiser.stopScan()
      .then((sucess) => {
        console.log("Stop Scan Successful", sucess);
      }).catch(error => {
        console.log("Stop Scan Error", error); 
      });

    this.setState({
      isLogging: false,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.props.devices}
          renderItem={({ item }) => <BleDevice device={item} />}
          keyExtractor={item => item.id}
        />
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            console.log("Pressed button: " + name);
            if (name==='bt_scan'){
              this.start();
            }
          }}
          color={"tomato"}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});