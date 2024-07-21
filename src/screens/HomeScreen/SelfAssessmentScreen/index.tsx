import Fonts from '@/assets/styles/fonts';
import IllustationDocterNurseSvg from '@/assets/svg/docter-nurse-amico.svg';
import IllustationBabySvg from '@/assets/svg/happy-baby-rafiki.svg';
import IllustationHospitalSvg from '@/assets/svg/hospital-child-amico.svg';

import FixedBottom from '@/components/FixedBottom';

import {RootStackParamList} from '@/types/reactNavigation';

import {questionDummies} from '@/utils/dummies/selfAssessmentDummies';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {ReactNode, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Modal,
  Portal,
  RadioButton,
  Text,
  useTheme,
} from 'react-native-paper';
import {SvgProps} from 'react-native-svg';

type Props = NativeStackScreenProps<RootStackParamList, 'SelfAssessment'>;

enum ScoreEnum {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

const getAssessmentCategory = (totalScore: number): string => {
  const highThreshold = questionDummies.length * 4;
  const lowThreshold = questionDummies.length * 2;

  if (totalScore <= lowThreshold) {
    return ScoreEnum.LOW;
  } else if (totalScore <= highThreshold) {
    return ScoreEnum.MEDIUM;
  } else {
    return ScoreEnum.HIGH;
  }
};

const SelfAssessmentScreen = (_: Props) => {
  const initAnswer = new Array<string>(0).fill('');
  const [answers, setAnswers] = useState<string[]>(initAnswer);
  const [result, setResult] = useState<string | null>(null);
  const [componentIcon, setComponentIcon] = useState<React.FC<SvgProps>>();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const isAllFieldsRequired = answers.length === questionDummies.length;
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const totalScore = answers.reduce((acc, cur) => acc + Number(cur), 0);
    const category = getAssessmentCategory(totalScore);
    showModal();
    switch (category) {
      case ScoreEnum.HIGH:
        setComponentIcon(() => (
          <IllustationBabySvg
            width={320}
            height={320}
            style={{alignSelf: 'center'}}
          />
        ));
        setResult(
          'Anak mungkin tidak mengalami gejala stunting, tetapi tetap pantau perkembangan.',
        );
        break;
      case ScoreEnum.MEDIUM:
        setComponentIcon(() => (
          <IllustationDocterNurseSvg
            width={320}
            height={320}
            style={{alignSelf: 'center'}}
          />
        ));
        setResult(
          'Perhatikan lebih lanjut perkembangan anak, dan konsultasikan dengan tenaga kesehatan jika perlu.',
        );
        break;
      case ScoreEnum.LOW:
        setComponentIcon(() => (
          <IllustationHospitalSvg
            width={320}
            height={320}
            style={{alignSelf: 'center'}}
          />
        ));
        setResult(
          'Disarankan untuk segera berkonsultasi dengan tenaga kesehatan untuk penanganan lebih lanjut.',
        );
        break;
      default:
        break;
    }
    setAnswers(initAnswer);
  };
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          {componentIcon as ReactNode}
          <Text
            variant="bodySmall"
            style={{
              marginTop: 8,
              textAlign: 'center',
            }}>
            {result}
          </Text>
        </Modal>
      </Portal>
      <ScrollView style={styles.formContainer}>
        {questionDummies.map((question, index) => (
          <View key={question.id} style={styles.questionContainer}>
            <View style={styles.questionLabelContainer}>
              <Text style={styles.questionNumber}>{index + 1}.</Text>
              <Text style={styles.questionText}>{question.questionText}</Text>
            </View>
            <RadioButton.Group
              onValueChange={value => handleAnswerChange(index, value)}
              value={answers[index]}>
              {question.options.map((option, optionIndex) => (
                <RadioButton.Item
                  key={optionIndex}
                  label={option.label}
                  value={option.value.toString()}
                />
              ))}
            </RadioButton.Group>
          </View>
        ))}
      </ScrollView>
      <FixedBottom
        style={{
          borderColor: theme.colors.surfaceVariant,
          backgroundColor: theme.colors.background,
        }}>
        <Button
          onPress={handleSubmit}
          mode="contained"
          theme={{roundness: 10}}
          disabled={!isAllFieldsRequired}
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
  },
  formContainer: {
    maxHeight: '100%',
    marginBottom: 80,
    padding: 10,
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
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    flex: 1,
  },
  questionNumber: {
    fontSize: 18,
    marginBottom: 10,
    width: 29,
    marginLeft: 4,
  },
  questionLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 8,
  },
});

export default SelfAssessmentScreen;
