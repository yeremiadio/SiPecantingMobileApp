import {View, Text} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {useAppDispatch} from '@/store';
import {logout} from '@/store/slices/authSlice';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(logout());
  return (
    <View style={{padding: 16}}>
      <Button
        mode="contained"
        onPress={handleLogout}
        style={{marginTop: 16}}
        contentStyle={{height: 48}}
        theme={{roundness: 10}}>
        Logout
      </Button>
    </View>
  );
};

export default ProfileScreen;
