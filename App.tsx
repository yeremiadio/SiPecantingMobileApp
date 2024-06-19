import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HelloScreen from '@/screens/HelloScreen';
import LoginScreen from '@/screens/LoginScreen';
import {Provider} from 'react-redux';
import {setupStore} from '@/store';

const Stack = createNativeStackNavigator();

const store = setupStore();

const isSignedIn = false;
export const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {isSignedIn ? (
            <>
              <Stack.Screen name="Home" component={HelloScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
