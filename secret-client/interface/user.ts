import { Nullable } from '@/interface/baseType';

export interface IUserInfo {
  id: number;
  address: string;
  nickName: Nullable<string>;
  avatar: Nullable<string>;
  description: Nullable<string>;
}
