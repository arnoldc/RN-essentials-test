import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppDrawer from './AppDrawer';
import BiometricSuccessPage from '../screens/BiometricSuccessPage';
import QRCodeSuccessPage from '../screens/QRCodeSuccessPage';
import QRCodeSuccessWeb from '../screens/QRCodeSuccessWeb';

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BiometricDrawer" >
          <Stack.Screen name="BiometricSuccess" component={BiometricSuccessPage} />
          <Stack.Screen name="QRCodeSuccess" component={QRCodeSuccessPage} />
          <Stack.Screen name="QRCodeSuccessWeb" component={QRCodeSuccessWeb} />
          <Stack.Screen name="BiometricDrawer" component={AppDrawer} />
        </Stack.Navigator>
    );
  };

  export default RootStack;