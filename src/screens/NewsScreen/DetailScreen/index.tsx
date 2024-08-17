import Fonts from '@/assets/styles/fonts';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {useGetArticleByIdQuery} from '@/store/articleStoreApi';
import {RootStackParamList} from '@/types/reactNavigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import React, {useLayoutEffect, useMemo} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Chip, Text, useTheme} from 'react-native-paper';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const MAX_HEIGHT = 300;

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;
type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NewsDetail'
>;

type Props = {
  route: DetailScreenRouteProp;
  navigation: DetailScreenNavigationProp;
};

const DetailNewsScreen = ({route, navigation}: Props) => {
  const {id} = route.params;
  const theme = useTheme();
  const {data} = useGetArticleByIdQuery({id}, {skip: !id});
  const detailNews = useMemo(() => data ?? undefined, [id]);
  const opacity = useSharedValue(0);

  const handleShare = async () =>
    Share.open({
      title: detailNews?.title,
      message: detailNews?.content,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });

  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 250) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: theme.colors.primary,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.roundButton}>
          <Icon name="arrow-left" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleShare} style={styles.roundButton}>
          <Icon
            name="share-variant-outline"
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, theme.colors.primary]);

  return (
    <SafeAreaView style={[styles.container]}>
      <ParallaxScrollView
        scrollEvent={onScroll}
        backgroundColor={theme.colors.background}
        contentBackgroundColor={theme.colors.background}
        style={{flex: 1}}
        parallaxHeaderHeight={250}
        contentContainerStyle={{
          borderTopRightRadius: 18,
          borderTopLeftRadius: 18,
          bottom: 12,
        }}
        stickyHeaderHeight={56}
        renderBackground={() => (
          <Animated.Image
            source={
              detailNews?.thumbnailImage
                ? {uri: detailNews.thumbnailImage}
                : require('@/assets/images/no_image.jpg')
            }
            style={[styles.image]}
          />
        )}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text variant="titleMedium" ellipsizeMode="tail" numberOfLines={1}>
              {detailNews?.title}
            </Text>
          </View>
        )}>
        <View
          style={{
            flex: 1,
            padding: 16,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
              gap: 8,
            }}>
            <View style={styles.cardChipWrapper}>
              <Chip
                theme={{roundness: 10}}
                style={styles.cardChip}
                ellipsizeMode="tail"
                mode="flat">
                {detailNews?.category?.name}
              </Chip>
            </View>
          </View>
          <Text
            variant="headlineMedium"
            style={{fontFamily: Fonts.InterBold, marginBottom: 8}}>
            {detailNews?.title}
          </Text>
          <Text style={{textAlign: 'justify'}} variant="bodyMedium">
            {detailNews?.content}
          </Text>
        </View>
        {/* <ScrollView horizontal>
          {articleListDummies.map(item => (
            <ExploreCard key={item.id} {...item} />
          ))}
        </ScrollView> */}
      </ParallaxScrollView>
    </SafeAreaView>
  );
};

export default DetailNewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stickySection: {
    marginLeft: 70,
    display: 'flex',
    height: 56,
    maxWidth: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardChip: {
    marginTop: 2,
  },
  cardChipWrapper: {flexDirection: 'row', flexWrap: 'wrap'},
  image: {
    width: width,
    height: MAX_HEIGHT,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
