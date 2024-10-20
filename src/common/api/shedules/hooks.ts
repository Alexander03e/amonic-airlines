import { KEYS } from 'Common/types/api';
import { ShedulesApi } from './api';
import { IFlightSchedule, ISearchSchedulesPayload, TScheduleRoutes } from 'Common/types/flights';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const schedulesApi = ShedulesApi.getInstance();

/** Хук для использования расписаний полетов */
export const useFlightSchedules = () => {
    return useQuery<IFlightSchedule[]>({
        queryKey: [KEYS.FLIGHT_SCHEDULES],
        queryFn: async () => {
            return await schedulesApi.getSchedules();
        },
    });
};

/** Хук для обновления рейса */
export const useUpdateSchedule = () => {
    const queryClient = useQueryClient();

    return useMutation<IFlightSchedule, unknown, Partial<IFlightSchedule>>({
        mutationFn: (data: Partial<IFlightSchedule>) => schedulesApi.updateSchedule(data),
        onSuccess: (data: IFlightSchedule) => {
            if (data && data.id) {
                queryClient.setQueryData<IFlightSchedule[]>([KEYS.FLIGHT_SCHEDULES], oldData => {
                    if (!oldData) return [];

                    return oldData.map(schedule =>
                        schedule.id === data.id ? { ...schedule, ...data } : schedule,
                    );
                });

                queryClient.invalidateQueries({
                    queryKey: [KEYS.FLIGHT_SCHEDULES, data.id],
                });
            }
        },
    });
};

export const useScheduleRoutes = (data: ISearchSchedulesPayload) => {
    // return useQuery<TScheduleRoutes[]>({
    //     queryKey: [KEYS.SCHEDULE_ROUTES, data.arrivalAirport, data.date, data.departureAirport],
    //     queryFn: async () => {
    //         return await schedulesApi.getSchedulesByFilters(data);
    //     },
    // });

    return useMutation<TScheduleRoutes[], unknown, ISearchSchedulesPayload>({
        mutationFn: (data: ISearchSchedulesPayload) => schedulesApi.getSchedulesByFilters(data),
        mutationKey: [KEYS.SCHEDULE_ROUTES, data.arrivalAirport, data.date, data.departureAirport],
    });
};
