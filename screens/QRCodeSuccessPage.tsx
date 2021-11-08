import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const QRCodeSuccessPage: React.FC = ({route}) => {
  return (
    <View style={styles.container}>
       <Text style={styles.text}>{`Scanned data: ${route.params.key}`} </Text>
    </View>
  );
};

export default QRCodeSuccessPage;

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
});
