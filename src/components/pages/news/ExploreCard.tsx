import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import Fonts from '@/assets/styles/fonts';
import {Chip, Text, TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

type Props = {
  id: number;
  imageUrl?: string;
  caption: string;
  title: string;
  duration: string;
  category: string;
  isExternalImage?: boolean;
};

const ExploreCard = ({
  id,
  title,
  duration,
  category,
  caption,
  imageUrl,
  isExternalImage,
}: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableRipple
      style={{marginVertical: 8}}
      onPress={() => navigation.navigate('NewsDetail', {id})}>
      <View style={styles.exploreWrapperCard}>
        <Image
          style={styles.cardImage}
          alt="explore-card"
          source={
            isExternalImage
              ? {uri: imageUrl}
              : imageUrl || require('@/assets/images/no_image.jpg')
          }
        />
        {/* <View></View> */}
        <View style={styles.cardContentWrapper}>
          <Text style={styles.cardContentSmallTitle}>{caption}</Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            style={styles.cardContentTitle}
            variant="titleMedium">
            {title}
          </Text>
          <View style={styles.cardFooterContentWrapper}>
            <View style={styles.cardChipWrapper}>
              <Chip
                theme={{roundness: 10}}
                style={styles.cardChip}
                ellipsizeMode="tail"
                mode="flat">
                {category}
              </Chip>
            </View>
            <Text style={styles.cardFooterContentDuration} variant="bodySmall">
              {duration} hari lalu
            </Text>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default ExploreCard;

const styles = StyleSheet.create({
  exploreWrapperCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardImage: {
    width: 120,
    height: 120,
    objectFit: 'cover',
    borderRadius: 8,
  },
  cardContentWrapper: {flex: 1},
  cardChip: {
    marginTop: 2,
  },
  cardChipWrapper: {flexDirection: 'row', flexWrap: 'wrap'},
  cardContentTitle: {
    fontFamily: Fonts.InterBold,
    marginVertical: 2,
  },
  cardFooterContentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 8,
    justifyContent: 'space-between',
  },
  cardFooterContentDuration: {
    textAlign: 'right',
    color: 'grey',
  },
  cardContentSmallTitle: {
    fontSize: 10,
    // color: 'grey',
  },
});
