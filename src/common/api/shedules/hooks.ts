import { KEYS } from 'Common/types/api';
import { ShedulesApi } from './api';
import { IFlightSchedule, ISearchSchedulesPayload, IUpdateSchedule, TFlightShedulePayload, TScheduleRoutes } from 'Common/types/flights';
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
    return useMutation<TScheduleRoutes[], unknown, ISearchSchedulesPayload>({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mutationFn: (data: ISearchSchedulesPayload) => schedulesApi.getSchedulesByFilters(data),
        mutationKey: [KEYS.SCHEDULE_ROUTES, data.arrivalAirport, data.date, data.departureAirport],
    });
};

export const useSchedulesBySearch = (data: Partial<ISearchSchedulesPayload>, shouldUpdate: boolean, onFinish: () => void) => {
    return useQuery({
        queryKey: [KEYS.FLIGHT_SCHEDULES],
        queryFn: async () => {
                onFinish()
                return await schedulesApi.getSchedulesBySearch(data);
        },
        throwOnError: true,
        enabled: !!shouldUpdate,
    })
}

export const useUploadSchedules = () => {
    const queryClient = useQueryClient()

    return useMutation<void | {status: number}, unknown, IUpdateSchedule[]>({
        mutationFn: (data: IUpdateSchedule[]) => schedulesApi.uploadSchedules(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [KEYS.FLIGHT_SCHEDULES],
            });
        }
    });
}

export const useRoutes = () => {

    return useQuery({
        queryKey: [KEYS.ROUTES],
        queryFn: async () => {
            return await schedulesApi.getRoutes();
        }
    })
}



export const useCreateSchedule = () => {
    const queryClient = useQueryClient()
    return useMutation<IFlightSchedule, unknown, TFlightShedulePayload>({
        mutationFn: (data: TFlightShedulePayload) => schedulesApi.createSchedule(data),
        onSuccess: (data: IFlightSchedule) => {
            queryClient.setQueryData<IFlightSchedule[]>([KEYS.FLIGHT_SCHEDULES], oldData => {
                if (!oldData) return [];

                return [...oldData, data];
            });
        }
    })
}