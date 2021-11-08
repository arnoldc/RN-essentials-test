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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const BiometricPage: React.FC = () => {
    const [biometricSupported, setBiometricSupported] = useState<boolean>(false);
    const [isPrivateKeyExist, setPrivateKeyExist] = useState<boolean>(false);
    const [privateKey, setPrivateKey] = useState<string>();
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
    
    const checkBiometricSupport = async (): Promise<void> => {
      const {biometryType} = await ReactNativeBiometrics.isSensorAvailable();
      setBiometricSupported(biometryType === ReactNativeBiometrics.Biometrics);
    }
  
    const onPressBiometrics = async () : Promise<void> => {
        // creates the string that will be signed by the RSA signature
        let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
        let payload = epochTimeSeconds + 'some message'

        try {
          const { success, signature } =  await ReactNativeBiometrics.createSignature({
            promptMessage:  'Sign in',
            payload, 
            cancelButtonText: 'Cancel Sign In'
          })
      
          if(success) {
            // - signature is a base64 signature
            // - This signature is something that we can send to a server for verification
            navigation.navigate('BiometricSuccess', { key: signature})
          } else {
            ToastAndroid.showWithGravity('User cancelled biometric prompt', ToastAndroid.SHORT, ToastAndroid.CENTER);
          }
        } catch (e) {
          ToastAndroid.showWithGravity( `${e}`, ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    };

    const isBiometricKeyExist = async () : Promise<void> => {
        const {  keysExist  } = await ReactNativeBiometrics.biometricKeysExist();
        setPrivateKeyExist(keysExist)
    }
   
    // creates a private key at the keystore and will be used later for ReactNativeBiometrics.createSignature()
    const createBiometricKey = async (): Promise<void> => {
       const {  publicKey } =  await ReactNativeBiometrics.createKeys();
       setPrivateKey(publicKey);
       setPrivateKeyExist(true)
    }
    
    useEffect(() => {
      try {
        checkBiometricSupport();
        isBiometricKeyExist();
      } catch (e) {
        console.log('error', e);
      }
    }, []);
  
    return (
      <View style={styles.container}>
        {biometricSupported ? (
        <TouchableOpacity onPress={onPressBiometrics}>
          <View style={styles.loginType}>
              <View style={styles.loginIconContainer}>
                <Image source={require('../assets/fingerprint.png')} style={styles.image}   />
              </View>
          </View>
        </TouchableOpacity>) : <Text style={styles.text}>Device isnt supported</Text>}

        <TouchableOpacity style={styles.button} onPress={createBiometricKey}>
              <Text style={styles.text}>Create Private key </Text>
          </TouchableOpacity>
        {isPrivateKeyExist  && <Text style={styles.text}>{privateKey} </Text> }
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
      paddingHorizontal: 10,
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
  button: {
    padding: 10,
    backgroundColor: '#ff0',
    borderRadius: 15,
  },
  });
  