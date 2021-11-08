import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Modal } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const QRCodePage: React.FC = () => {
  const navigation =useNavigation<NativeStackNavigationProp<any, any>>();
  const [showModal, setShowModal] = useState<boolean>(false)

  const validURL = (str: string): boolean  => {
    var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(str);
  }

  const onReadQRCode = (event: BarCodeReadEvent) => {
      try {
        if(validURL(event.data)) {
             navigation.navigate('QRCodeSuccessWeb', { url: event.data})
          return;
        } else {
             navigation.navigate('QRCodeSuccess', { key: event.data})
        }
      } catch(e) {
        ToastAndroid.showWithGravity(
          'Error scanning qr code',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
  }

  const modal = ()  => (
    <Modal isVisible={showModal} transparent={true} animationType="slide" onRequestClose={() => setShowModal(false)}>
      <View style={styles.modal}>
            <QRCodeScanner 
                  onRead={onReadQRCode}
                  fadeIn={false}
            />
      </View>
</Modal>
  );

  return (
    <View style={styles.container}>
      {showModal && modal()}
        <TouchableOpacity style={styles.button} onPress={() => setShowModal(!showModal)}>
              <Text style={styles.text}>Show QR Code Scanner </Text>
        </TouchableOpacity>
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
  modal: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
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
