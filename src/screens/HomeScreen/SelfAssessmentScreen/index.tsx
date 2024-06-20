import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import Fonts from '@/assets/styles/fonts';
import {RootStackParamList} from '@/types/reactNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from 'react-native-paper';
import FixedBottom from '@/components/FixedBottom';
import InputText from '@/components/inputs/InputText';

type Props = NativeStackScreenProps<RootStackParamList, 'SelfAssessment'>;

const SelfAssessmentScreen = (_: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <InputText
          label={'Nomor Telepon'}
          mode="outlined"
          placeholder="Masukkan nomor telepon..."
          isLabelFloating={false}
        />
        <InputText
          label={'Nama'}
          mode="outlined"
          placeholder="Masukkan nama..."
          isLabelFloating={false}
        />
        <InputText
          label={'Nama'}
          mode="outlined"
          placeholder="Masukkan nama..."
          isLabelFloating={false}
        />
        <InputText
          label={'Nama'}
          mode="outlined"
          placeholder="Masukkan nama..."
          isLabelFloating={false}
        />
        <InputText
          label={'Nama'}
          mode="outlined"
          placeholder="Masukkan nama..."
          isLabelFloating={false}
        />
        <InputText
          label={'Nama'}
          mode="outlined"
          placeholder="Masukkan nama..."
          isLabelFloating={false}
        />
        <InputText
          label={'Nama'}
          mode="outlined"
          placeholder="Masukkan nama..."
          isLabelFloating={false}
        />
        <InputText
          label={'Nama'}
          mode="outlined"
          placeholder="Masukkan nama..."
          isLabelFloating={false}
        />
      </ScrollView>
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
    flex: 1,
    padding: 16,
  },
  formContainer: {
    maxHeight: '100%',
    marginBottom: 80,
  },
  buttonFooter: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.InterBold,
  },
});

export default SelfAssessmentScreen;
