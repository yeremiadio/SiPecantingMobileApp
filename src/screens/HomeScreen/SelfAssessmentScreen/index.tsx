import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import Fonts from '@/assets/styles/fonts';
import {RootStackParamList} from '@/types/reactNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, useTheme} from 'react-native-paper';
import FixedBottom from '@/components/FixedBottom';
import InputText from '@/components/inputs/InputText';

type Props = NativeStackScreenProps<RootStackParamList, 'SelfAssessment'>;

const SelfAssessmentScreen = (_: Props) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <InputText
          label={'Nama'}
          mode="outlined"
          placeholder="Masukkan nama..."
          isLabelFloating={false}
        />
        <InputText
          label={'Anak ke'}
          mode="outlined"
          placeholder="Masukkan anak ke..."
          isLabelFloating={false}
        />
        <InputText
          label={'Tanggal Lahir'}
          mode="outlined"
          placeholder="Masukkan tanggal lahir..."
          isLabelFloating={false}
        />
        <InputText
          label={'Umur'}
          mode="outlined"
          placeholder="Masukkan umur..."
          isLabelFloating={false}
        />
        <InputText
          label={'Berat Badan'}
          mode="outlined"
          placeholder="Masukkan berat badan (kg)..."
          isLabelFloating={false}
        />
        <InputText
          label={'Tinggi Badan'}
          mode="outlined"
          placeholder="Masukkan tinggi badan (cm)..."
          isLabelFloating={false}
        />
      </ScrollView>
      <FixedBottom
        style={{
          borderColor: theme.colors.surfaceVariant,
          backgroundColor: theme.colors.background,
        }}>
        <Button
          onPress={() => {}}
          mode="contained"
          theme={{roundness: 10}}
          contentStyle={styles.buttonFooter}>
          Submit
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
