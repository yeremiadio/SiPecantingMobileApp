import {View, StyleSheet, ViewStyle, StyleProp, ScrollView} from 'react-native';
import React, {ReactNode} from 'react';
import {RootStackParamList, RootTabParamList} from '@/types/reactNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import Fonts from '@/assets/styles/fonts';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';
import SelfAssessmentIcon from '@/assets/svg/self-assessment.svg';
import SuccessStuntingIcon from '@/assets/svg/success-stunting.svg';
import RembukStuntingIcon from '@/assets/svg/rembuk-stunting.svg';
import CallCenterIcon from '@/assets/svg/call-center.svg';
import GridView from '@/components/GridView';
import useAppSelector from '@/utils/hooks/useAppSelector';
type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Main'>,
  NativeStackScreenProps<RootStackParamList, 'Home'>
>;

const HomeScreen = ({navigation}: Props) => {
  const theme = useTheme();
  const {fullName} = useAppSelector(state => state.authSlice);
  const viewStyle: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors.secondaryContainer,
  };
  const sectionViewStyle: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors.background,
    padding: 16,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    gap: 8,
  };

  const gridViewArray: {
    id: number;
    name: string;
    description: string;
    icon: ReactNode;
    tabRoute?: keyof RootTabParamList;
    routes?: keyof RootStackParamList;
  }[] = [
    {
      id: 1,
      name: 'Self Assessment',
      description: "Evaluate your child's growth with a quick self-check.",
      icon: (
        <SelfAssessmentIcon width={56} height={56} style={{marginBottom: 8}} />
      ),
      routes: 'SelfAssessment',
    },
    {
      id: 2,
      name: 'Success Stunting',
      description:
        "Track and celebrate milestones in your child's development.",
      icon: (
        <SuccessStuntingIcon width={56} height={56} style={{marginBottom: 8}} />
      ),
      tabRoute: 'News',
    },
    {
      id: 3,
      name: 'Rembuk Stunting',
      description: 'Join the conversation: Share and learn with other parents.',
      icon: (
        <RembukStuntingIcon width={56} height={56} style={{marginBottom: 8}} />
      ),
      routes: 'RembukStuntingList',
    },
    {
      id: 4,
      name: 'Call Center',
      description: 'Get expert advice anytime with our 24/7 helpline.',
      icon: <CallCenterIcon width={56} height={56} style={{marginBottom: 8}} />,
      routes: 'CallCenter',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={viewStyle}>
        <View
          style={{
            paddingVertical: 16,
            paddingHorizontal: 20,
            marginTop: 48,
            marginBottom: 8,
          }}>
          <Text variant="headlineSmall" style={{fontFamily: Fonts.InterBold}}>
            Selamat datang, {fullName ?? ''}
          </Text>
          <Text variant="bodyMedium">
            Silahkan pilih menu untuk akses fitur kami
          </Text>
        </View>
        <View style={sectionViewStyle}>
          <GridView
            paddingGap={6}
            data={gridViewArray}
            renderItem={item => (
              <TouchableRipple
                style={{
                  borderRadius: 8,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  backgroundColor: theme.colors.background,
                  elevation: 3,
                }}
                onPress={() => {
                  if (item.tabRoute) {
                    navigation.navigate(item.tabRoute);
                  }
                  if (item.routes) {
                    navigation.navigate(item.routes as any);
                  }
                }}>
                <View
                  style={{
                    padding: 16,
                    flex: 1,
                    height: 180,
                  }}>
                  <View>
                    {item.icon}
                    <Text
                      variant="titleMedium"
                      style={{fontFamily: Fonts.InterBold}}>
                      {item.name}
                    </Text>
                    <Text variant="bodySmall" style={{marginTop: 4}}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </TouchableRipple>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 140,
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.InterBold,
  },
});

export default HomeScreen;
