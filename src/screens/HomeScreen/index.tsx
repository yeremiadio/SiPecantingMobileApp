import {
  View,
  Button,
  Text,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React from 'react';
import {RootStackParamList, RootTabParamList} from '@/types/reactNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch} from '@/store';
import {logout} from '@/store/slices/authSlice';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import Fonts from '@/assets/styles/fonts';
import {useTheme} from 'react-native-paper';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Main'>,
  NativeStackScreenProps<RootStackParamList, 'Home'>
>;

const HomeScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const {width, height} = useWindowDimensions();
  const handleLogin = () => {
    dispatch(logout());
  };
  const handleNavigateSelfAssessment = () => {
    navigation.push('SelfAssessment');
  };

  const viewStyle: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    height: height / 2,
    width,
  };
  return (
    <View style={styles.container}>
      <View style={viewStyle}>
        <Text>Test</Text>
      </View>
      <Text style={styles.text}>HomeScreen</Text>
      <Button title="Self Assessment" onPress={handleNavigateSelfAssessment} />
      <Button title="Logout" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.InterBold,
  },
});

export default HomeScreen;
