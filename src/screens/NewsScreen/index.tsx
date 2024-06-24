import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import Fonts from '@/assets/styles/fonts';
import ExploreCard from '@/components/pages/news/ExploreCard';
import {articleListDummies} from '@/utils/dummies/articleDummies';

const NewsScreen = () => {
  const dummyData = articleListDummies;

  // const dummyDataBanner = [
  //   {
  //     id: 1,
  //     imageUrl: require('@/assets/images/news-3-1.jpg'),
  //     duration: 5,
  //     title:
  //       'Tingkat Stunting Wonogiri Tinggal 8 Persen, Bupati Jekek: 2024 Zero F',
  //   },
  //   {
  //     id: 2,
  //     imageUrl: require('@/assets/images/news-1-1.jpg'),
  //     duration: 10,
  //     title:
  //       'Pengukuran Serentak Intervensi Stunting Baru Capai Separuh dari Target',
  //   },
  //   {
  //     id: 3,
  //     imageUrl: require('@/assets/images/news-2-1.jpeg'),
  //     duration: 2,
  //     title: 'Lorem ipsum dolor sit amet erat, consectetur adipiscing elit',
  //   },
  // ];

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          {/* <Text variant="titleLarge" style={styles.sectionHeader}>
            Breaking News
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dummyDataBanner.map(item => (
              <BreakingNewsBanner
                key={item.id}
                imageUrl={item.imageUrl}
                duration={item.duration}
                title={item.title}
              />
            ))}
          </ScrollView> */}
          <View style={styles.sectionHeaderWrapper}>
            <Text variant="titleLarge" style={styles.sectionHeader}>
              Explore
            </Text>
            <Text
              variant="titleMedium"
              style={[styles.sectionHeader, styles.link]}>
              Lihat semua
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{paddingHorizontal: 16}}
            showsHorizontalScrollIndicator={false}>
            {dummyData.map(item => (
              <ExploreCard key={item.id} {...item} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      {/* */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSection: {
    padding: 16,
    marginVertical: 8,
  },
  sectionHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeader: {
    fontWeight: 600,
    paddingVertical: 8,
    paddingHorizontal: 16,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  link: {
    color: '#177EC1',
  },
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

export default NewsScreen;
