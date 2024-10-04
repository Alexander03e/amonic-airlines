import { TUserRole } from 'Common/types/role';

export interface IAuthContext {
    isAuth: boolean;
    login: (token: string) => void;
    logout: () => void;
    role: TUserRole | null;
    isLoading?: boolean;
    isError?: boolean;
}
