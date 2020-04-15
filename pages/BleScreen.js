import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { 
  SafeAreaView, 
  StyleSheet,
  FlatList
} from 'react-native';

import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons'
import BLEAdvertiser from 'react-native-ble-advertiser';
import UUIDGenerator from 'react-native-uuid-generator';
import { PermissionsAndroid } from 'react-native';

/* Import Components */
import BleDevice from '../src/BleDevice';

const actions = [{
  text: 'Scan',
  icon: <Icon name={'ios-bluetooth'} size={24} color={'white'} />,
  name: 'bt_scan',
  position: 1
},
{
  text: 'Stop Scan',
  icon: <Icon name={'ios-close'} size={24} color={'white'} />,
  name: 'bt_stop',
  position: 2
}];

export async function requestLocationPermission() {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'BLE Avertiser Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
      } else {
        console.log("location permission denied")
      }
    }

    const blueoothActive = await BLEAdvertiser.getAdapterState().then(result => {
      console.log('[Bluetooth]', "isBTActive", result)
      return result === "STATE_ON";
    }).catch(error => { 
      console.log('[Bluetooth]', "BT Not Enabled")
      return false;
    });

    if (!blueoothActive) {
      await Alert.alert(
        'Private Kit requires bluetooth to be enabled',
        'Would you like to enable Bluetooth?',
        [
          {
            text: 'Yes',
            onPress: () => BLEAdvertiser.enableAdapter(),
          },
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
        ],
      )
    }

    console.log("BT Active?", blueoothActive);
  } catch (err) {
    console.warn(err)
  }
}

export default class BleScreen extends Component {
  state = {
    devicesFound: [],
    isLogging: false,
    uuid: ''
  }

  addFoundDevice(_uuid, _name, _rssi) {
    const newDevice = {
      id: _uuid,
      name: _name || 'undefined',
      rssi: _rssi
    };
    console.log("Added device:", newDevice);
    this.setState({
      devicesFound: [...this.state.devicesFound, newDevice]
    });
    this.props.addDevice(_uuid, _name, _rssi);
  }

  isValidUUID(uuid) {
    if (!uuid)return false;
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
  }

  componentDidMount(){
    requestLocationPermission();

    console.log("BLE Advertiser", BLEAdvertiser);
    BLEAdvertiser.setCompanyId(0x7777);

    UUIDGenerator.getRandomUUID((newUid) => {
      this.setState({
        uuid: newUid
      });
    });

    const eventEmitter = Platform.select({
      ios: new NativeEventEmitter(NativeModules.BLEAdvertiser),
      android: new NativeEventEmitter(NativeModules.BLEAdvertiser),
    });
    eventEmitter.addListener('onDeviceFound', (event) => {
      console.log('onDeviceFound', event);
      if (event.serviceUuids) {
        for(let i=0; i< event.serviceUuids.length; i++){
          if (this.isValidUUID(event.serviceUuids[i]))
            this.addFoundDevice(event.serviceUuids[i], event.deviceName, event.rssi)   
        }
      }
    });
  }

  start() {
    console.log("Starting Advertising");
    BLEAdvertiser.broadcast(this.state.uuid, [12,23,56])
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
            } else if (name==='bt_stop'){
              this.stop();
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