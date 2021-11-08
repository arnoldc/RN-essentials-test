import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
    ToastAndroid,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const BiometricSimplepage: React.FC = () => {

 const onPressBiometrics = async () => {
        const { success  } =  await ReactNativeBiometrics.simplePrompt({ promptMessage : ' Confirm fingerprint'});

        if (success) {
            ToastAndroid.showWithGravity('Succesful biometrics provided', ToastAndroid.SHORT, ToastAndroid.CENTER);
          } else {
            ToastAndroid.showWithGravity('user cancelled biometric prompt', ToastAndroid.SHORT, ToastAndroid.CENTER);
          }
 }

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={onPressBiometrics}>
          <View style={styles.loginType}>
              <View style={styles.loginIconContainer}>
                <Image source={require('../assets/fingerprint.png')} style={styles.image}   />
              </View>
          </View>
        </TouchableOpacity>
    </View>
  );
};

export default BiometricSimplepage;

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
      image: {
        width: 70,
        height: 70,
      },
});
