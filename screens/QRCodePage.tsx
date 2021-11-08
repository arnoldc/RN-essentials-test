import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';


const QRCodePage: React.FC = () => {
  const navigation = useNavigation();

  const onReadQRCode = (e) => {
      try {
        navigation.navigate('QRCodeSucces', { key: e.data})
      } catch(e) {
        ToastAndroid.showWithGravity(
          'Error scanning qr code',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.heading}> QR Code scanner </Text>
        <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Scan QR Code </Text>
        </TouchableOpacity>

      <QRCodeScanner
          onRead={onReadQRCode}
          flashMode={RNCamera.Constants.FlashMode.off}
        />
    </View>
  );
};

export default QRCodePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#222',
  },
  heading: {
    fontSize: 24,
    color: '#000',
    paddingBottom: 30,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#ff0',
    borderRadius: 15,
  },
});
