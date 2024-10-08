import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-simple-toast';
import Fonts from '@/assets/styles/fonts';

import {RootStackParamList} from '@/types/reactNavigation';
import {Button, Text, useTheme} from 'react-native-paper';
import InputText from '@/components/inputs/InputText';
import IllustationMotherSvg from '@/assets/svg/Motherhood-amico.svg';
import {login} from '@/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '@/store';
import {signIn} from '@/store/slices/authSlice';
import {getUserDetail} from '@/api/user';
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState<string>('sipecanting@gmail.com');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('password');
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const handleLogin = async () => {
    setIsSubmitting(true);
    await login({email: email, password: password})
      .then(async response => {
        try {
          const authData = response.data;
          await AsyncStorage.setItem('token', authData.token);
          await AsyncStorage.setItem('userId', authData.id.toString());
          await getUserDetail({id: authData.id})
            .then(async responseUserData => {
              setIsSubmitting(false);
              const user = responseUserData.data.data;
              await AsyncStorage.setItem('userDetailId', user.id.toString());
              dispatch(
                signIn({
                  id: authData.id,
                  isLoggedIn: !!authData.token,
                  fullName: user.fullName,
                }),
              );
            })
            .catch(() => setIsSubmitting(false));
        } catch (error) {
          Toast.show(
            'Error while getting user detail.Please try again.',
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
        Toast.show('Failed to login. Please try again.', Toast.SHORT, {
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
        </View>
        <Button
          mode="contained"
          onPress={handleLogin}
          style={{marginTop: 16}}
          disabled={!email || !password || isSubmitting}
          contentStyle={{height: 48}}
          theme={{roundness: 10}}>
          Log in
        </Button>
        <View style={{marginTop: 12}}>
          <Text style={{textAlign: 'center'}}>
            Are you a new user?{' '}
            <Text
              onPress={() => navigation.navigate('Register')}
              style={{color: theme.colors.primary, fontWeight: 'bold'}}>
              Sign Up
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

export default LoginScreen;
