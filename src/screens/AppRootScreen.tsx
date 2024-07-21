import React from 'react';
import LoginScreen from './LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, RootTabParamList} from '@/types/reactNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useAppSelector from '@/utils/hooks/useAppSelector';
import HomeScreen from './HomeScreen';
import NewsScreen from './NewsScreen';
import Fonts from '@/assets/styles/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './ProfileScreen';
import {StyleProp, TextStyle} from 'react-native';
import SelfAssessmentScreen from './HomeScreen/SelfAssessmentScreen';
import {stackNavigationAnimationAnimationConfig} from '@/utils/configs/stackNavigationAnimationConfig';
import {headerConfig} from '@/utils/configs/header';
import {useTheme} from 'react-native-paper';
import DetailNewsScreen from './NewsScreen/DetailScreen';
import CallCenterScreen from './HomeScreen/CallCenterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const tabBarLabelStyle: StyleProp<TextStyle> = {
  fontFamily: Fonts.InterSemiBold,
};

const MenuIconComponent = ({focused}: {focused: boolean}) => {
  const theme = useTheme();
  return (
    <Icon
      color={focused ? theme.colors.secondary : undefined}
      name={focused ? 'home-variant' : 'home-variant-outline'}
      size={28}
    />
  );
};
const NewsIconComponent = ({focused}: {focused: boolean}) => {
  const theme = useTheme();
  return (
    <Icon
      color={focused ? theme.colors.secondary : undefined}
      name={focused ? 'text-box' : 'text-box-outline'}
      size={28}
    />
  );
};
const ProfileIconComponent = ({focused}: {focused: boolean}) => {
  const theme = useTheme();
  return (
    <Icon
      color={focused ? theme.colors.secondary : undefined}
      name={focused ? 'account-circle' : 'account-circle-outline'}
      size={28}
    />
  );
};

const HomeTabList = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        height: 64,
        borderTopWidth: 0,
        shadowOpacity: 0,
      },
      tabBarItemStyle: {paddingVertical: 8},
      tabBarLabelStyle,
    }}>
    <Tab.Screen
      options={{
        tabBarIcon: MenuIconComponent,
        tabBarLabel: 'Home',
        headerShown: false,
      }}
      name="Main"
      component={HomeScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: NewsIconComponent,
        headerTitle: 'Artikel',
        tabBarLabel: 'Konten',
      }}
      name="News"
      component={NewsScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ProfileIconComponent,
        tabBarLabel: 'Profil',
      }}
      name="Profile"
      component={ProfileScreen}
    />
  </Tab.Navigator>
);
const MainNavigator = () => {
  const {isLoggedIn} = useAppSelector(state => state.authSlice);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeTabList}
            options={{
              headerShown: false,
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="SelfAssessment"
            component={SelfAssessmentScreen}
            options={{
              ...stackNavigationAnimationAnimationConfig,
              ...headerConfig,
            }}
          />
          <Stack.Screen
            name="CallCenter"
            component={CallCenterScreen}
            options={{
              ...stackNavigationAnimationAnimationConfig,
              ...headerConfig,
            }}
          />
          <Stack.Group
            screenOptions={{...stackNavigationAnimationAnimationConfig}}>
            <Stack.Screen name="NewsDetail" component={DetailNewsScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      )}
    </Stack.Navigator>
  );
};

const AppRootScreen = () => {
  return <MainNavigator />;
};

export default AppRootScreen;
