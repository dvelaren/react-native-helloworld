/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// import BLEAdvertiser from 'react-native-ble-advertiser';
// import UUIDGenerator from 'react-native-uuid-generator';

// var UUID;
// UUIDGenerator.getRandomUUID((newUid) => {
//   UUID = newUid;
//   console.log(UUID);
// });

// BLEAdvertiser.setCompanyId(0x1234); // Your Company's Code
// BLEAdvertiser.broadcast("44bb3538-e3be-4824-849e-802143c63283", [12, 23, 56]) // The UUID you would like to advertise and additional manufacturer data. 
//   .then(success => console.log('Broadcasting Sucessful', success))
//   .catch(error => console.log('Broadcasting Error', error));

AppRegistry.registerComponent(appName, () => App);
