import { Storage } from 'Common/utils/storage';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useAuthContext } from '../Auth/context';

const storage = Storage.getInstance();

export const LoggerProvider = ({ children }: PropsWithChildren) => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const { isAuth } = useAuthContext();

    useEffect(() => {
        console.log(isAuth);
        if (!isAuth) {
            // storage.remove('loginTime');
            // storage.remove('sessionTime');

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                intervalRef.current = null;
            };
        }

        const loginTime = storage.get('loginTime');
        const sessionTime = storage.get('sessionTime');
        const now = new Date().toISOString();

        if (!loginTime) {
            storage.add('loginTime', now);
        }

        if (!sessionTime) {
            storage.add('sessionTime', '0');
        }

        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                const currentLoginTime = new Date().toISOString();

                storage.add('sessionTime', currentLoginTime);
                localStorage.setItem('sessionTime', currentLoginTime);
            }, 5000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            intervalRef.current = null;
        };
    }, [isAuth]);

    return <>{children}</>;
};
