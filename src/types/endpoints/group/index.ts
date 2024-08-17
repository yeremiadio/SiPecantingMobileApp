import {IMessage, IMessageGroup} from '../message';

export interface IGroup {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  users: Array<{id: number}>;
  messages: Array<IMessage>;
}

export interface IGroupRequestObject extends Pick<IGroup, 'name'> {
  userIds?: number[];
}

export interface IGroupDetail {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  users: Array<{id: number}>;
  messages: Array<IMessageGroup>;
}

/***
 * {
  "id": 1,
  "createdAt": "2024-08-17T00:07:46.532Z",
  "updatedAt": "2024-08-17T00:07:46.532Z",
  "name": "Group Test",
  "users": [
    {
      "id": 1
    }
  ],
  "messages": [
    {
      "id": 1,
      "content": "Hi! Greeting from test 2",
      "createdAt": "2024-08-17T00:08:10.579Z",
      "updatedAt": "2024-08-17T00:08:10.579Z",
      "userId": 1,
      "groupId": 1,
      "userDetail": {
        "fullName": "Si Pecanting"
      }
    }
  ]
}
 */
