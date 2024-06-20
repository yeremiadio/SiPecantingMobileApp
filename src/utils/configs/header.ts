import Fonts from '@/assets/styles/fonts';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const headerConfig: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerTitleStyle: {
    fontFamily: Fonts.InterMedium,
  },
};
