import React, { useState, useEffect } from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    Image,
    ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';

const BiometricPage: React.FC = () => {
    const [biometricSupported, setBiometricSupported] = useState(false);
    const navigation = useNavigation();
  
    async function checkBiometric() {
      const {biometryType} = await ReactNativeBiometrics.isSensorAvailable();
      setBiometricSupported(biometryType === ReactNativeBiometrics.Biometrics);
    }
  
    const onPressBiometrics = async () => {
        let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
        let payload = epochTimeSeconds + 'some message'

        try {
          const { success, signature } =  await ReactNativeBiometrics.createSignature({
            promptMessage:  'Sign in',
            payload, 
            cancelButtonText: 'Cancel Sign In'
          })
      
          if(success) {
            navigation.navigate('BiometricSuccess', { key: signature})
          } else {
            ToastAndroid.showWithGravity(
              'User cancelled biometric prompt',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        } catch (e) {
          ToastAndroid.showWithGravity(
            `${e}`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
    };

    const isBiometricKeyExist = async () => {
        const {  keysExist  } = await ReactNativeBiometrics.biometricKeysExist();
        return keysExist;
    }
   
    // creates a private key at the keystore and will be used later for ReactNativeBiometrics.createSignature()
    const createBiometricKey = async () =>await ReactNativeBiometrics.createKeys('somepublickeyhere');

    useEffect(() => {
      try {
        checkBiometric();
        if(biometricSupported && isBiometricKeyExist()) {
            createBiometricKey();
        }
      } catch (e) {
        console.log('error', e);
      }
    }, [biometricSupported]);
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}> Sign In </Text>
        <TouchableOpacity onPress={onPressBiometrics}>
          <View style={styles.loginType}>
            {biometricSupported && (
              <View style={styles.loginIconContainer}>
                <Image
                  source={require('../assets/fingerprint.png')}
                  style={styles.image}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
};

export default BiometricPage;

const styles = StyleSheet.create({
    image: {
      width: 70,
      height: 70,
      marginBottom: 10,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontSize: 24,
      color: '#000',
      paddingBottom: 30,
      textAlign: 'center',
    },
    loginIconContainer: {
      alignItems: 'center',
    },
    loginType: {
      flexDirection: 'row',
    },
    text: {
      color: '#222',
    },
    miniImage: {
      height: 12,
      width: 12,
    },
  });
  