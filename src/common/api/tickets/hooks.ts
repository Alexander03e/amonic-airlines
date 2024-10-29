import { useQuery } from '@tanstack/react-query';
import { TicketsApi } from './api';
import { KEYS } from 'Common/types/api';
import { TCabinType } from 'Common/types/flights';
import { IAmenity } from 'Common/types/tickets';

const ticketsApi = TicketsApi.getInstance();

export const useAmenities = () => {
    return useQuery({
        queryKey: [KEYS.AMENITIES],
        queryFn: () => ticketsApi.getAmenities(),
    });
};

export const useTickets = (id: string) => {
    return useQuery({
        queryKey: [KEYS.TICKETS, id],
        queryFn: () => ticketsApi.getTicketsById(id),
        enabled: !!id,
    });
};

export const useAmenitiesCabinType = () => {
    return useQuery({
        queryKey: [KEYS.AMENITY_CABIN_TYPE],
        queryFn: () => ticketsApi.getAmenitiesCabinType(),
        select: data => {
            const map = {} as Record<TCabinType, (IAmenity & { cabinId: number })[]>;
            data?.forEach(item => {
                if (map[item.cabinType.name]) {
                    map[item.cabinType.name].push({
                        ...item.amenities,
                        cabinId: item.cabinType.id,
                    });
                } else {
                    map[item?.cabinType.name] = [{ ...item.amenities, cabinId: item.cabinType.id }];
                }
            });

            return map;
        },
    });
};
