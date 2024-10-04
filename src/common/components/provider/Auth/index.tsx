import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './context';
import { TUserRole } from 'Common/types/role';

interface IProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: IProps) => {
    const [isAuth, setIsAuth] = useState(false);
    const [role, setRole] = useState<TUserRole | null>(null);
    const [isLoading] = useState(false);
    const [isError] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsAuth(true);

            const role = token.split('/')[0];

            setRole(role as TUserRole);
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
            role,
            isLoading,
            isError,
        }),
        [isAuth, login, logout, role, isError, isLoading],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
