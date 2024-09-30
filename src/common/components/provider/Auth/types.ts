export interface IAuthContext {
    isAuth: boolean;
    login: (token: string) => void;
    logout: () => void;
}
