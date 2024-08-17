import {IGroup} from '../group';
import {IUserDetail, IUserWithDetail} from '../user';

export interface IMessage {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  groupId: number;
  userDetail: IUserDetail;
  group: IGroup;
}
export interface IMessageGroup {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  groupId: number;
  user: IUserWithDetail;
  group: IGroup;
  // messages: Array<Omit<IMessageGroup, 'userDetail' | 'group'>>;
}
