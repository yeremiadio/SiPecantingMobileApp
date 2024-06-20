import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Fonts from '@/assets/styles/fonts';
import {RootStackParamList} from '@/types/reactNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from 'react-native-paper';
import FixedBottom from '@/components/FixedBottom';

type Props = NativeStackScreenProps<RootStackParamList, 'SelfAssessment'>;

const SelfAssessmentScreen = (_: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SelfAssessmentScreen</Text>
      <FixedBottom>
        <Button
          onPress={() => {}}
          mode="contained"
          theme={{roundness: 10}}
          contentStyle={styles.buttonFooter}>
          Self Assessment
        </Button>
      </FixedBottom>
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
  buttonFooter: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    // flex: 1,
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.InterBold,
  },
});

export default SelfAssessmentScreen;
