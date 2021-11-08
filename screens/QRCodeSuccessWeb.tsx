import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';

const QRCodeSuccessWeb: React.FC = ({ route }) =>  (
  <View style={styles.container}>
        <Text style={styles.text}>Webview loaded:</Text>
        <Text style={styles.text}>{route.params.url}</Text>
        <WebView source={{ uri: route.params.url }} />
  </View>
)

export default QRCodeSuccessWeb;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  text: {
    color: '#222',
  },
});
