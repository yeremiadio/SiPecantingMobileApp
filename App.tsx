import * as React from 'react';
import {
  adaptNavigationTheme,
  configureFonts,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import {Provider} from 'react-redux';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import AppRootScreen from '@/screens/AppRootScreen';

import {setupStore} from '@/store/index';

import {fontConfig} from '@/utils/configs/font';
import {darkTheme, lightTheme} from '@/utils/configs/theme';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';

const store = setupStore();

export const App = () => {
  const paperTheme = {...MD3LightTheme, colors: lightTheme.colors};
  const {LightTheme} = adaptNavigationTheme({
    reactNavigationLight: {
      dark: false,
      colors: {
        ...DefaultTheme.colors,
        primary: lightTheme.colors.primary,
        background: lightTheme.colors.background,
      },
    },
    reactNavigationDark: {
      dark: false,
      colors: {
        ...DefaultTheme.colors,
        primary: darkTheme.colors.primary,
        background: darkTheme.colors.background,
      },
    },
  });

  const theme: ThemeProp = {
    ...paperTheme,
    roundness: 1,
    fonts: configureFonts({config: fontConfig}),
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={LightTheme}>
          <AppRootScreen />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
