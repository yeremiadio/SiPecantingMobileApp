import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Fonts from '@/assets/styles/fonts';

import {useAppDispatch} from '@/store';
import {signIn} from '@/store/slices/authSlice';

import {RootStackParamList} from '@/types/reactNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = (_: Props) => {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(signIn());
  };
  return (
    <SafeAreaView>
      <View style={styles.loginContainer}>
        <Text style={styles.text}>Login Page</Text>
        <Button onPress={handleLogin} title="Login" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.InterBold,
  },
});

export default LoginScreen;
