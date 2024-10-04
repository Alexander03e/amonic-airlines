import { useQuery } from '@tanstack/react-query';
import { KEYS } from 'Common/types/api';
import { CommonApi } from './api';

const commonApi = CommonApi.getInstance();

/** Хук для получения офисов */
export const useOffices = () => {
    return useQuery({ queryKey: [KEYS.OFFICES], queryFn: commonApi.getOffices });
};
