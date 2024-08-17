import {
  IGroup,
  IGroupDetail,
  IGroupRequestObject,
} from '@/types/endpoints/group';
import {IMessage} from '@/types/endpoints/message';
import {IBackendResponse} from '@/types/global';
import {baseUrls} from '@/utils/configs/endpointUrls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const groupStoreApi = createApi({
  reducerPath: 'groupMessageStoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrls.base,
    prepareHeaders: async headers => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['group', 'group-detail'],
  endpoints: builder => ({
    getGroups: builder.query<IGroup[], Partial<IGroup>>({
      query: obj => ({
        url: baseUrls.group,
        method: 'GET',
        params: {...obj},
      }),
      transformResponse: (response: IBackendResponse<IGroup[]>) =>
        response.data,
      providesTags: ['group'],
    }),
    //Get Group Chat detail
    getGroupById: builder.query<IGroupDetail, Partial<IGroupDetail>>({
      query: obj => ({
        url: `${baseUrls.group}/${obj.id}`,
        method: 'GET',
        params: {...obj},
      }),
      transformResponse: (response: IGroupDetail) => response,
      providesTags: ['group', 'group-detail'],
    }),
    createGroup: builder.mutation<IGroup, IGroupRequestObject>({
      query: obj => {
        return {
          url: baseUrls.group,
          body: obj,
          method: 'POST',
        };
      },
      invalidatesTags: ['group'],
    }),
    sendGroupMessage: builder.mutation<
      IMessage,
      Pick<IMessage, 'content' | 'groupId'>
    >({
      query: obj => {
        return {
          url: baseUrls.message,
          body: obj,
          method: 'POST',
        };
      },
      invalidatesTags: ['group-detail', 'group'],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupByIdQuery,
  useSendGroupMessageMutation,
  useCreateGroupMutation,
  util: {resetApiState: resetGroupStoreApiState},
} = groupStoreApi;
