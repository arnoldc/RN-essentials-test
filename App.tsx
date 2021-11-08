import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './navigation/RootStack';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const App = () => {
  return (
    <NavigationContainer>
          <RootStack />
    </NavigationContainer>
  );
};

export default App;
