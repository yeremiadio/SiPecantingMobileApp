import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, TouchableRipple} from 'react-native-paper';

type Props = {
  duration: number;
  title: string;
  imageUrl: ImageSourcePropType;
};

const BreakingNewsBanner = ({duration, title, imageUrl}: Props) => {
  return (
    <TouchableRipple
      style={styles.touchableContainer}
      onPress={() => console.log('banner pressed')}>
      <View style={styles.container}>
        <Image
          alt="banner-breakingnews"
          style={styles.image}
          source={imageUrl}
        />
        <Text
          numberOfLines={2}
          style={styles.title}
          variant="titleMedium"
          ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.duration} variant="labelSmall">
          {duration} hari yang lalu
        </Text>
      </View>
    </TouchableRipple>
  );
};

export default BreakingNewsBanner;

const styles = StyleSheet.create({
  touchableContainer: {
    marginHorizontal: 16,
  },
  container: {
    width: 320,
  },
  title: {
    height: 56,
    width: '95%',
  },
  duration: {
    textAlign: 'right',
  },
  image: {
    objectFit: 'cover',
    borderRadius: 12,
    height: 180,
    width: '100%',
  },
});
