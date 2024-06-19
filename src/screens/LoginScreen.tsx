import Fonts from '@/assets/styles/fonts';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

// type Props = {};

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.loginContainer}>
        <Text style={styles.text}>Login Page</Text>
        <Button title="Login" />
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
