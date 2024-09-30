import { createContext, useContext } from 'react';
import { IAuthContext } from './types';

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext должен быть внутри AuthProvider');
    }

    return context;
};
