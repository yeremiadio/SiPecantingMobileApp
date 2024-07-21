import {View, StyleSheet} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

interface Props<T> {
  data: T[];
  renderItem(item: T): JSX.Element;
  col?: number;
  paddingGap?: number;
}

const GridView = <T,>(props: Props<T>) => {
  const {data, col = 2, renderItem} = props;
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          // eslint-disable-next-line react/react-in-jsx-scope
          <View
            key={index}
            style={{
              width: `${100 / col}%`,
            }}>
            <TouchableRipple
              style={{
                padding: props.paddingGap ?? 6,
              }}>
              {renderItem(item)}
            </TouchableRipple>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%', flexDirection: 'row', flexWrap: 'wrap'},
});

export default GridView;
