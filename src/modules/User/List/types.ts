import { IUser } from 'Common/types/user';

export type TUserRow = Record<keyof Omit<IUser, 'id' | 'active'>, string> & {
    id: number | string;
    active: boolean | string;
};
