import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {setupStore} from '@/store/index';
import AppRootScreen from '@/screens/AppRootScreen';

const store = setupStore();

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRootScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
