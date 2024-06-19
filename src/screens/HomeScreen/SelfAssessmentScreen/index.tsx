import {View, Text, StyleSheet, Button} from 'react-native';
import React from 'react';
import Fonts from '@/assets/styles/fonts';
import {RootStackParamList} from '@/types/reactNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'SelfAssessment'>;

const SelfAssessmentScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SelfAssessmentScreen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.InterBold,
  },
});

export default SelfAssessmentScreen;
