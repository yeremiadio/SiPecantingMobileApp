import * as React from 'react';
import {useColorScheme} from 'react-native';
import {
  adaptNavigationTheme,
  configureFonts,
  MD3DarkTheme,
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
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === 'dark'
      ? {...MD3DarkTheme, colors: darkTheme.colors}
      : {...MD3LightTheme, colors: lightTheme.colors};
  const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: {
      dark: false,
      colors: {
        ...DefaultTheme.colors,
        primary: lightTheme.colors.primary,
        background: lightTheme.colors.background,
      },
    },
    reactNavigationDark: {
      dark: true,
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
        <NavigationContainer
          theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
          <AppRootScreen />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
