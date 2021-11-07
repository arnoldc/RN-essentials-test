
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BiometricPage from '../screens/BiometricPage';
import QRCodePage from '../screens/QRCodePage';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Biometrics" component={BiometricPage} />
        <Drawer.Screen name="QRCode" component={QRCodePage} />
      </Drawer.Navigator>
    );
  };

  export default AppDrawer;