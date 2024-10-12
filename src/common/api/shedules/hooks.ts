import { KEYS } from 'Common/types/api';
import { ShedulesApi } from './api';
import { IFlightSchedule, TFlightShedulePayload } from 'Common/types/flights';
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
        mutationFn: (data: Partial<IFlightSchedule>) => {
            if (!data?.id) return;

            return schedulesApi.updateSchedule(data);
        },
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
