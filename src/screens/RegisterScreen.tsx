import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-simple-toast';
import Fonts from '@/assets/styles/fonts';

import {RootStackParamList} from '@/types/reactNavigation';
import {Button, Text, useTheme} from 'react-native-paper';
import InputText from '@/components/inputs/InputText';
import {createUserDetail, register} from '@/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '@/store';
import {signIn} from '@/store/slices/authSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({navigation}: Props) => {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [shortName, setShortName] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleRegister = async () => {
    setIsSubmitting(true);
    await register({email: email, password: password})
      .then(async res => {
        try {
          await AsyncStorage.setItem('token', res.data.token);
          await AsyncStorage.setItem('userId', res.data.id.toString());
          await createUserDetail({
            shortName,
            fullName,
            age: parseInt(age),
            phoneNumber,
          })
            .then(async resDetail => {
              await AsyncStorage.setItem(
                'userDetailId',
                resDetail.data.id.toString(),
              );
              dispatch(
                signIn({
                  id: res.data.id,
                  isLoggedIn: !!res.data.token,
                  fullName: resDetail.data.fullName,
                  shortName: resDetail.data.shortName,
                  age: resDetail.data.age,
                  phoneNumber: resDetail.data.phoneNumber,
                }),
              );
              setIsSubmitting(false);
              navigation.navigate('Home');
            })
            .catch(() => setIsSubmitting(false));
        } catch (error) {
          Toast.show(
            'Error while creating user. Please try again.',
            Toast.SHORT,
            {
              tapToDismissEnabled: true,
            },
          );
          setIsSubmitting(false);
          console.log(error);
        }
      })
      .catch(error => {
        Toast.show('Failed to register. Please try again.', Toast.SHORT, {
          tapToDismissEnabled: true,
        });
        console.log(error);
        setIsSubmitting(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <View style={styles.loginContainer}>
      <ScrollView
        contentContainerStyle={{justifyContent: 'center'}}
        style={styles.formLoginContainer}>
        <Text variant="headlineLarge">Welcome</Text>
        <Text variant="bodyLarge">
          Please enter the correct credential information for we can know you
          more
        </Text>
        <View style={{marginTop: 8}}>
          <InputText
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={(value: string) => setEmail(value)}
            placeholder="Please enter your email..."
          />
          <InputText
            label="Password"
            mode="outlined"
            secureTextEntry
            value={password}
            onChangeText={(value: string) => setPassword(value)}
            placeholder="Please enter your password..."
          />
          <InputText
            label="Full Name"
            mode="outlined"
            value={fullName}
            onChangeText={(value: string) => setFullName(value)}
            placeholder="Please enter your full name..."
          />
          <InputText
            label="Short Name"
            mode="outlined"
            value={shortName}
            onChangeText={(value: string) => setShortName(value)}
            placeholder="Please enter your short name..."
          />
          <InputText
            label="Age"
            mode="outlined"
            keyboardType="number-pad"
            value={age}
            onChangeText={(value: string) => setAge(value)}
            placeholder="Please enter your age..."
          />
          <InputText
            label="Phone Number"
            mode="outlined"
            keyboardType="number-pad"
            value={phoneNumber}
            onChangeText={(value: string) => setPhoneNumber(value)}
            placeholder="Please enter your phone number..."
          />
        </View>
        <Button
          mode="contained"
          onPress={handleRegister}
          style={{marginTop: 16}}
          disabled={!email || !password || isSubmitting}
          contentStyle={{height: 48}}
          theme={{roundness: 10}}>
          Register
        </Button>
        <View style={{marginTop: 12}}>
          <Text style={{textAlign: 'center'}}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}
              style={{color: theme.colors.primary, fontWeight: 'bold'}}>
              Sign In
            </Text>
          </Text>
        </View>
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

export default RegisterScreen;
