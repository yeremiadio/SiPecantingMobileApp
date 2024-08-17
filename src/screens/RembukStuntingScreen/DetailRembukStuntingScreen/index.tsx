import {View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {
  Bubble,
  GiftedChat,
  IMessage,
  Send,
  SendProps,
} from 'react-native-gifted-chat';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/reactNavigation';
import {
  useGetGroupByIdQuery,
  useSendGroupMessageMutation,
} from '@/store/groupStoreApi';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = NativeStackScreenProps<RootStackParamList, 'RembukStuntingDetail'>;

const DetailRembukStuntingScreen = ({navigation, route}: Props) => {
  const id = route.params.id;
  const [sendMessage] = useSendGroupMessageMutation();
  const {data, isLoading} = useGetGroupByIdQuery({id}, {skip: !id});
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userId, setUserId] = useState<number>();

  const loadUserId = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('userDetailId');
      if (storedValue !== null) {
        setUserId(Number(storedValue)); // Update state
      }
    } catch (err) {
      console.error('Failed to load data', err);
    }
  };

  useEffect(() => {
    loadUserId();
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      // console.log(data.messages);
      navigation.setOptions({
        headerTitle: 'Group Chat',
      });
      const mappedMessages = data.messages.map(item => {
        return {
          _id: item.id,
          text: item.content,
          createdAt: new Date(item.createdAt),
          user: {
            _id: item.user.UserDetail.userId,
            name: item.user.UserDetail.fullName ?? '',
            avatar: item.user.UserDetail.profileImage ?? '',
          },
        };
      });
      setMessages(mappedMessages);
    }
  }, [data, isLoading]);

  const onSend = useCallback(
    async (messagesGifted: IMessage[]) => {
      if (id) {
        await sendMessage({groupId: id, content: messagesGifted[0].text})
          .unwrap()
          .then(() => {
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, messagesGifted),
            );
          })
          .catch(errorRes => {
            Toast.show(
              'Failed to send message. Please try again.',
              Toast.SHORT,
              {
                tapToDismissEnabled: true,
              },
            );
            console.log(errorRes);
          });
      } else {
        Toast.show(
          'Group Message ID Not Found. Please try again.',
          Toast.SHORT,
          {
            tapToDismissEnabled: true,
          },
        );
        // console.log('Failed to send message. Group ID Not Found');
      }
    },
    [id, sendMessage, GiftedChat, data],
  );

  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props: Bubble<IMessage>['props']) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messagesData => onSend(messagesData)}
      user={userId ? {_id: userId} : undefined}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      // renderUsername={username => <Text>{username.name}</Text>}
      renderUsernameOnMessage
      placeholder="Type a message..."
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default DetailRembukStuntingScreen;

// const styles = StyleSheet.create({});
