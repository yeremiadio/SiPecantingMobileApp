import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Fonts from '@/assets/styles/fonts';

import {useAppDispatch} from '@/store';
import {signIn} from '@/store/slices/authSlice';

import {RootStackParamList} from '@/types/reactNavigation';
import {Button, Text} from 'react-native-paper';
import InputText from '@/components/inputs/InputText';
import IllustationMotherSvg from '@/assets/svg/Motherhood-amico.svg';
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = (_: Props) => {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(signIn());
  };
  return (
    <View style={styles.loginContainer}>
      <ScrollView
        contentContainerStyle={{justifyContent: 'center'}}
        style={styles.formLoginContainer}>
        <IllustationMotherSvg
          width={240}
          height={240}
          style={{alignSelf: 'center', marginBottom: 8, marginTop: 36}}
        />
        <Text variant="headlineLarge">Welcome back</Text>
        <Text variant="bodyLarge">
          We're happy to see you again. Please enter the correct credential
          information
        </Text>
        <View style={{marginTop: 8}}>
          <InputText
            label="Email"
            mode="outlined"
            placeholder="Please enter your email..."
          />
          <InputText
            label="Password"
            mode="outlined"
            secureTextEntry
            placeholder="Please enter your password..."
          />
        </View>
        <Button
          mode="contained"
          onPress={handleLogin}
          style={{marginTop: 16}}
          contentStyle={{height: 48}}
          theme={{roundness: 10}}>
          Log in
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 16,
  },
  formLoginContainer: {
    maxHeight: '100%',
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.InterBold,
  },
});

export default LoginScreen;
