import {IUser, IUserDetail} from '@/types/endpoints/user';
import {AxiosResponse} from 'axios';
import axiosInstance from '../axiosInstance';
import {userUrls} from '@/utils/configs/endpointUrls';

const getUserDetail = (
  data: Pick<IUser, 'id'>,
): Promise<AxiosResponse<{data: IUserDetail}>> =>
  axiosInstance.get(`${userUrls.detail}/${data.id}`);

export {getUserDetail};
