import { useQuery, useQueryClient } from '@tanstack/react-query';
import { KEYS } from 'Common/types/api';
import { CommonApi } from './api';

const commonApi = CommonApi.getInstance();

/** Хук для получения офисов */
export const useOffices = () => {
    return useQuery({
        queryKey: [KEYS.OFFICES],
        queryFn: async () => await commonApi.getOffices(),
    });
};

/** Хук для получения ролей */
export const useRoles = () => {
    return useQuery({
        queryKey: [KEYS.ROLES],
        queryFn: async () => await commonApi.getRoles(),
    });
};

export const useQueryCache = <T>(key: string[]): T | undefined => {
    const queryClient = useQueryClient();

    return queryClient.getQueryData<T>(key);
};
