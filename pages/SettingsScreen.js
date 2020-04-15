import React from 'react'
import { 
    SafeAreaView, 
    StyleSheet
} from 'react-native';


/* Components */
import TestComponent from '../src/TestComponent';


export default function SettingsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <TestComponent id={4} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
  });