import { useQuery } from '@tanstack/react-query';
import { AirportsApi } from './api';
import { KEYS } from 'Common/types/api';
import { IAirport } from 'Common/types/flights';

const airportsApi = AirportsApi.getInstance();

/** Хук для использования получения аэропортов */
export const useAirports = () => {
    return useQuery<IAirport[]>({
        queryKey: [KEYS.AIRPORTS],
        queryFn: async () => {
            return await airportsApi.getAirports();
        },
    });
};
