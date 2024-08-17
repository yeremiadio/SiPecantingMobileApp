import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  FAB,
  Modal,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-simple-toast';
import Fonts from '@/assets/styles/fonts';

import {RootStackParamList} from '@/types/reactNavigation';
import {useCreateGroupMutation, useGetGroupsQuery} from '@/store/groupStoreApi';
import InputText from '@/components/inputs/InputText';
type Props = NativeStackScreenProps<RootStackParamList, 'RembukStuntingList'>;

const RembukStuntingScreen = ({navigation}: Props) => {
  const {data, isLoading} = useGetGroupsQuery({});
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');
  const [createGroup, {isLoading: isLoadingSubmit}] = useCreateGroupMutation();
  const hideModal = () => setIsShowModal(false);
  const [fabVisible, setFabVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setFabVisible(true);
    }, 100);
  }, []);

  const toggleModal = () => setIsShowModal(!isShowModal);

  const handleSubmitCreateGroup = useCallback(async () => {
    if (!groupName) return;
    return await createGroup({name: groupName})
      .unwrap()
      .then(res => {
        Toast.show('Group created successfully!.', Toast.SHORT, {
          tapToDismissEnabled: true,
        });
        hideModal();
        navigation.navigate('RembukStuntingDetail', {id: res.id});
      })
      .catch(err => {
        console.log(err);
        Toast.show('Failed to create group. Please try again.', Toast.SHORT, {
          tapToDismissEnabled: true,
        });
      });
  }, [createGroup, groupName, Toast, navigation]);

  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={isShowModal}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modalContainer,
            {backgroundColor: theme.colors.background},
          ]}>
          <InputText
            isLabelFloating={false}
            mode="outlined"
            placeholder="Please input group name..."
            onChangeText={text => setGroupName(text)}
            label="Group Name"
            value={groupName}
          />
          <Button
            onPress={handleSubmitCreateGroup}
            mode="contained"
            theme={{roundness: 10}}
            style={{marginTop: 16}}
            loading={isLoadingSubmit}
            disabled={isLoadingSubmit}>
            Create
          </Button>
        </Modal>
      </Portal>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => {
          return isLoading ? (
            <ActivityIndicator style={{marginTop: 15}} />
          ) : (
            <View style={{marginTop: 15}}>
              <Text>Belum ada pembahasan</Text>
            </View>
          );
        }}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('RembukStuntingDetail', {id: item.id})
            }>
            <View style={styles.groupInfo}>
              <View style={styles.groupTextSection}>
                <View style={styles.groupInfoText}>
                  <Text style={styles.groupName}>{item.name}</Text>
                </View>
                {item?.messages[0]?.content && (
                  <Text style={styles.messageText}>
                    {item?.messages[0]?.content}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.heading}>
        <FAB
          elevation={0}
          mode="flat"
          icon="plus"
          visible={fabVisible}
          style={styles.fab}
          label="Tambah"
          onPress={toggleModal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
  },
  groupInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupTextSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 0,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  groupInfoText: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    // marginBottom: 5,
  },
  heading: {
    position: 'relative',
    left: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 32,
    borderRadius: 30,
    left: 0,
    bottom: 0,
  },
  groupName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  groupPostTime: {
    fontSize: 12,
  },
  loginContainer: {
    flex: 1,
    padding: 16,
  },
  formLoginContainer: {
    maxHeight: '100%',
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.InterBold,
  },
  messageText: {
    color: '#333333',
  },
  modalContainer: {
    // backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 8,
  },
});

export default RembukStuntingScreen;
