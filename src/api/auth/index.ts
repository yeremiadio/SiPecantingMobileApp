import axiosInstance from '@/api/axiosInstance';
import {TUserPayloadWithDetail} from '@/types/endpoints/auth';
import {IAuthUser} from '@/types/endpoints/user';
import {authUrls, userUrls} from '@/utils/configs/endpointUrls';
import {AxiosResponse} from 'axios';

type TAuthCredentialObject = {
  email: string;
  password: string;
};

const login = (
  data: TAuthCredentialObject,
): Promise<AxiosResponse<IAuthUser>> =>
  axiosInstance.post(authUrls.login, data);

const register = (
  data: Pick<TUserPayloadWithDetail, 'email' | 'password'>,
): Promise<AxiosResponse<IAuthUser>> =>
  axiosInstance.post(authUrls.register, data);

const createUserDetail = (
  data: Omit<TUserPayloadWithDetail, 'email' | 'password'>,
): Promise<AxiosResponse<TUserPayloadWithDetail & {id: number}>> =>
  axiosInstance.post(userUrls.detail, data);

export {login, register, createUserDetail};
