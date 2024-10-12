import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { IUserLogPayload, IUserLogs, IUserLogsDataResponse } from 'Common/types/user';
import { LogsApi } from './api';
import { KEYS } from 'Common/types/api';

const logsApi = LogsApi.getInstance();

/** Хук изменения логов пользователя */
export const useUserLogsUpdate = (): UseMutationResult<IUserLogs, Error, IUserLogPayload> => {
    const queryClient = useQueryClient();
    return useMutation<IUserLogs, Error, IUserLogPayload>({
        mutationKey: [KEYS.LOGS],
        mutationFn: async (data: IUserLogPayload) => {
            return await logsApi.addUserLogs(data);
        },
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: [KEYS.LOGS, data.user.id],
            });
        },
    });
};

/** Хук для получения логов по айди пользователя */
export const useUserLogs = (id: number | undefined) => {
    return useQuery<IUserLogsDataResponse, Error>({
        queryKey: [KEYS.LOGS, id],
        queryFn: () => {
            if (!id)
                return {
                    timeSpend: '',
                    usersLogs: [],
                };
            return logsApi.getUserLogs(id);
        },
        enabled: !!id,
    });
};
