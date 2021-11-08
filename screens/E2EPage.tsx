import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const E2EPage: React.FC = () => {
  return (
    <View style={styles.container}>
       <Text style={styles.text}>Hello World </Text>
    </View>
  );
};

export default E2EPage;

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
