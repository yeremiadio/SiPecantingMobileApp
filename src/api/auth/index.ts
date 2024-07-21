import axiosInstance from '@/api/axiosInstance';
import {IAuthUser} from '@/types/endpoints/user';
import {authUrls} from '@/utils/configs/endpointUrls';
import {AxiosResponse} from 'axios';

type TAuthCredentialObject = {
  email: string;
  password: string;
};

const login = (
  data: TAuthCredentialObject,
): Promise<AxiosResponse<IAuthUser>> =>
  axiosInstance.post(authUrls.login, data);

export {login};
