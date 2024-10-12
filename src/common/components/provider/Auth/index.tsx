import { ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { AuthContext } from './context';
import { TUserRole } from 'Common/types/role';
import { useUserById } from 'Common/api/user/hooks';
import { Storage } from 'Common/utils/storage';
import { useUserStore } from 'Common/store/user';

interface IProps {
    children: ReactNode;
}

const storage = Storage.getInstance();

export const AuthProvider = ({ children }: IProps) => {
    const [isAuth, setIsAuth] = useState(false);
    const [role, setRole] = useState<TUserRole | null>(null);
    const [isLoading] = useState(false);
    const [isError] = useState(false);
    const [id, setId] = useState<number | null>(null);

    const { setUser } = useUserStore();

    // const { mutate: updateUserLogs } = useUserLogsUpdate();

    const { data } = useUserById(id);

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data, setUser]);

    useLayoutEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            /** Установка времени сессии */
            /** TODO: зарефакторить + перенесли в отдельный сервис если будет время */
            // const userId = token?.split('/')[1].split('_')[1];

            // const currentSessionLogin = storage.get('loginTime');
            // const currentSessionTime = storage.get('sessionTime');

            // const prevSessionLogin = localStorage.getItem('loginTime');
            // const prevSessionTime = localStorage.getItem('sessionTime');
            // const now = new Date().toISOString();

            // if ((!currentSessionLogin && !currentSessionTime) || currentSessionTime == '0') {
            //     const prevLoginTime = new Date(prevSessionLogin || '').getTime();
            //     const prevSessionDuration = new Date(prevSessionTime || '').getTime();
            //     const timeDifference = Math.abs(prevSessionDuration - prevLoginTime) / 1000;
            //     if (timeDifference > 2) {
            //         updateUserLogs({
            //             user: Number(userId),
            //             logInTime: String(prevSessionLogin),
            //             logOutTime: String(prevSessionTime),
            //         });
            //     }

            //     localStorage.setItem('loginTime', now);
            //     localStorage.setItem('sessionTime', now);
            // }
            /** --------------------- */

            setIsAuth(true);
        }
    }, [role]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (isAuth) {
            const role = token?.split('/')[0];
            const id = token?.split('/')[1].split('_')[1];

            setId(Number(id));
            setRole(role as TUserRole);
        } else {
            setId(null);
            setRole(null);
        }

        if (!token) {
            storage.remove('loginTime');
            storage.remove('sessionTime');
        }
    }, [isAuth]);

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
