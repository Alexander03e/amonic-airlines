import { TUserRole } from 'Common/types/role';
import { ReactNode } from 'react';

export interface IRoute {
    path: string;
    element: ReactNode;
}

export const PATHS = {
    MAIN: '/',

    AUTH: '/auth',

    ADMIN: '/admin',

    USER: '/user',
};

export const ROUTE_PATHS = {
    AUTH: {
        INDEX: '/auth',
    },

    USER: {
        INDEX: '/user',

        LOGS: {
            INDEX: '/logs',
        },
    },

    TICKETS: {
        INDEX: '/tickets',
    },

    ADMIN: {
        INDEX: '/admin',

        USERS: {
            INDEX: '/users',
        },

        FLIGHTS: {
            INDEX: '/flights',
        },

        BOOKING: {
            INDEX: '/booking',
        },

        SURVEYS: {
            INDEX: '/surveys',
        },
    },
};

export const ROLES: Record<string, TUserRole> = {
    ADMIN: 'Administrator',
    USER: 'User',
};
