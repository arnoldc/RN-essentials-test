import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,  ToastAndroid, } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const BiometricSuccessPage: React.FC = ({
    route
}) => {
  
  const onPressDelete = async () => {
      const {  keysDeleted } = await ReactNativeBiometrics.deleteKeys();
      if(keysDeleted) {
        ToastAndroid.showWithGravity(
          'Succesful Deletion',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        ToastAndroid.showWithGravity(
          'Failed to delete',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.text}> Generated key</Text> 
        <Text style={styles.text}>{`${route.params.key}`} </Text>
        <TouchableOpacity
             style={styles.button}
            onPress={onPressDelete}
        >
            <Text style={styles.text}> Delete private key</Text>
          </TouchableOpacity>
    </View>
  );
};

export default BiometricSuccessPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#222',
    paddingBottom: 10
  },
  button: {
    padding: 10,
    backgroundColor: '#ff0',
    borderRadius: 15,
  }
});
