import { IUser } from 'Common/types/user';

export interface IUserStore {
    user: IUser | null;
    timeSpent: string | null;

    setTimespent: (time: string) => void;
    setUser: (user: IUser | null) => void;
}
