import React from 'react'
import { 
  View, 
  StyleSheet
} from 'react-native';

/* Components */
import TestComponent from '../src/TestComponent';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TestComponent id={1} />
      <TestComponent id={2} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});