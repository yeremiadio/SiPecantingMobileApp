import React from 'react';
import {Linking, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Fonts from '@/assets/styles/fonts';

import {RootStackParamList} from '@/types/reactNavigation';
import {Button, Text} from 'react-native-paper';
import IllustationCallCenterSvg from '@/assets/svg/Call-center-amico.svg';
type Props = NativeStackScreenProps<RootStackParamList, 'CallCenter'>;

const CallCenterScreen = (_: Props) => {
  const handleCall = () => {
    const phoneNumber = '6281212958422';
    let phoneNumberFormatted = '';
    if (Platform.OS === 'android') {
      phoneNumberFormatted = `tel:${phoneNumber}`;
    } else {
      phoneNumberFormatted = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(phoneNumberFormatted);
  };
  return (
    <View style={styles.loginContainer}>
      <ScrollView
        contentContainerStyle={{justifyContent: 'center'}}
        style={styles.formLoginContainer}>
        <IllustationCallCenterSvg
          width={240}
          height={240}
          style={{alignSelf: 'center', marginBottom: 8, marginTop: 36}}
        />
        <Text
          variant="headlineMedium"
          style={{
            textAlign: 'center',
            fontFamily: Fonts.InterBold,
            marginBottom: 8,
          }}>
          24/7 Expert Helpline
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            textAlign: 'center',
            marginBottom: 8,
            fontFamily: Fonts.InterRegular,
          }}>
          Need assistance? Our experts are just a call away, ready to provide
          support and guidance anytime.
        </Text>
        <Button
          mode="contained"
          onPress={handleCall}
          style={{marginTop: 16}}
          contentStyle={{height: 48}}
          theme={{roundness: 10}}>
          Call us
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

export default CallCenterScreen;
