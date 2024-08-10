import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Fonts from '@/assets/styles/fonts';

import {RootStackParamList} from '@/types/reactNavigation';
import {Button, Text} from 'react-native-paper';
import IllustationMotherSvg from '@/assets/svg/Motherhood-amico.svg';
import FixedBottom from '@/components/FixedBottom';
import {useAppDispatch} from '@/store';
import {signIn} from '@/store/slices/authSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

const LandingScreen = (_: Props) => {
  const dispatch = useAppDispatch();
  const navigateToHome = () => {
    dispatch(
      signIn({
        isLoggedIn: true,
      }),
    );
  };

  return (
    <View style={styles.loginContainer}>
      <ScrollView
        contentContainerStyle={{justifyContent: 'center', flex: 1}}
        style={styles.formLoginContainer}>
        <IllustationMotherSvg
          width={240}
          height={240}
          style={{alignSelf: 'center', marginBottom: 36, marginTop: 0}}
        />
        <Text variant="headlineLarge">Welcome back</Text>
        <Text variant="bodyLarge">
          We're happy to see you again. You'll redirect to our main page.
        </Text>
      </ScrollView>
      <FixedBottom style={{borderTopWidth: 0}}>
        <Button
          mode="contained"
          onPress={navigateToHome}
          style={{marginTop: 16}}
          contentStyle={{height: 48}}
          theme={{roundness: 10}}>
          Get Started
        </Button>
      </FixedBottom>
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

export default LandingScreen;
