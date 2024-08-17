import {IArticle} from '@/types/endpoints/article';
import {IBackendResponse} from '@/types/global';
import {baseUrls} from '@/utils/configs/endpointUrls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const articleStoreApi = createApi({
  reducerPath: 'articleStoreApi',
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
  tagTypes: ['article', 'article-detail'],
  endpoints: builder => ({
    getArticles: builder.query<IArticle[], Partial<IArticle>>({
      query: obj => ({
        url: baseUrls.articles,
        method: 'GET',
        params: {...obj},
      }),
      transformResponse: (response: IBackendResponse<IArticle[]>) =>
        response.data,
      providesTags: ['article'],
    }),
    //Get Group Chat detail
    getArticleById: builder.query<IArticle, Partial<IArticle>>({
      query: obj => ({
        url: `${baseUrls.articles}/${obj.id}`,
        method: 'GET',
        params: {...obj},
      }),
      transformResponse: (response: IArticle) => response,
      providesTags: ['article-detail'],
    }),
    // createGroup: builder.mutation<IGroup, IGroupRequestObject>({
    //   query: obj => {
    //     return {
    //       url: baseUrls.group,
    //       body: obj,
    //       method: 'POST',
    //     };
    //   },
    //   invalidatesTags: ['group'],
    // }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  util: {resetApiState: resetArticleState},
} = articleStoreApi;
