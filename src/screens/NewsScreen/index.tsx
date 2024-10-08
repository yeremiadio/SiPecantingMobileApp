import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {ActivityIndicator, Text} from 'react-native-paper';
import Fonts from '@/assets/styles/fonts';
import ExploreCard from '@/components/pages/news/ExploreCard';
import {useGetArticlesQuery} from '@/store/articleStoreApi';

const NewsScreen = () => {
  const {data, isLoading, refetch} = useGetArticlesQuery({});
  const [refreshing, setRefreshing] = React.useState(false);

  const dataMemo = useMemo(() => data ?? [], [data, isLoading]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
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
          <View style={styles.sectionHeaderWrapper}>
            <Text variant="titleLarge" style={styles.sectionHeader}>
              Rekomendasi anda
            </Text>
          </View>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <ScrollView
              contentContainerStyle={{paddingHorizontal: 16}}
              showsHorizontalScrollIndicator={false}>
              {dataMemo?.map(item => (
                <ExploreCard key={item.id} {...item} isExternalImage />
              ))}
            </ScrollView>
          )}
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
