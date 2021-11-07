import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BiometricSuccessPage from '../screens/BiometricSuccessPage';
import AppDrawer from './AppDrawer';
import QRCodeSuccessPage from '../screens/QRCodeSuccessPage';

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="BiometricDrawer"
        >
          <Stack.Screen name="BiometricSuccess" component={BiometricSuccessPage} />
          <Stack.Screen name="QRCodeSucces" component={QRCodeSuccessPage} />
          <Stack.Screen name="BiometricDrawer" component={AppDrawer} />
        </Stack.Navigator>
    );
  };

  export default RootStack;