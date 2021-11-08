
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BiometricPage from '../screens/BiometricPage';
import QRCodePage from '../screens/QRCodePage';
import BiometricSimplepage from '../screens/BiometricSimplePage';
import E2EPage from '../screens/E2EPage';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
    return (
      <Drawer.Navigator>
       <Drawer.Screen name="Biometrics Simple" component={BiometricSimplepage} />
        <Drawer.Screen name="Biometrics Complex" component={BiometricPage} />
        <Drawer.Screen name="QRCode" component={QRCodePage} />
        <Drawer.Screen name="E2E" component={E2EPage} />
      </Drawer.Navigator>
    );
  };

  export default AppDrawer;