import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './context';

interface IProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: IProps) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsAuth(true);
            console.log(token, isAuth);
        }
    }, []);

    const login = useCallback((token: string) => {
        localStorage.setItem('token', token);
        setIsAuth(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setIsAuth(false);
    }, []);

    const value = useMemo(
        () => ({
            isAuth,
            login,
            logout,
        }),
        [isAuth, login, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
