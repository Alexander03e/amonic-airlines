import { IUser } from 'Common/types/user';

export interface IUserStore {
    user: IUser | null;
    timeSpent: string | null;
    currentSessionId: number | null;

    setCurrentSessionId: (time: number | null) => void;
    setTimespent: (time: string) => void;
    setUser: (user: IUser | null) => void;
}
