import {View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {useAppDispatch} from '@/store';
import {logout} from '@/store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useClearAllReduxCache from '@/utils/hooks/useClearAppCache';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const clearReduxCache = useClearAllReduxCache();
  const handleLogout = async () => {
    clearReduxCache();
    await AsyncStorage.removeItem('token').then(() => dispatch(logout()));
  };
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
