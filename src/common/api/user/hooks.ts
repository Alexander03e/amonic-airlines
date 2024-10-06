import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    IUser,
    TUserAuthPayload,
    TUserAuthResponse,
    TUserRegPayload,
    TUserUpdatePayload,
} from 'Common/types/user';
import { KEYS } from 'Common/types/api';
import { UserApi } from './api';

const userApi = UserApi.getInstance();

/** Хук для добавления пользователя */
export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation<IUser, unknown, TUserRegPayload>({
        mutationFn: (data: TUserRegPayload) => userApi.addUser(data),
        onSuccess: (newUser: IUser) => {
            queryClient.invalidateQueries({ queryKey: [KEYS.USERS] });

            queryClient.setQueryData<IUser[]>([KEYS.USERS], oldData => {
                if (!oldData) return [newUser];

                return [...oldData, newUser];
            });
        },
    });
};

/** Хук для получения всех пользователей */
export const useUsers = () => {
    return useQuery({
        queryKey: [KEYS.USERS],
        queryFn: async () => (await userApi.getUsers()).reverse(),
    });
};

/** Хук для изменения пользователя */
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation<IUser, unknown, Partial<TUserUpdatePayload>>({
        mutationFn: (data: Partial<TUserUpdatePayload>) => userApi.updateUser(data),
        onSuccess: (data: IUser) => {
            if (data && data.id) {
                queryClient.invalidateQueries({ queryKey: [KEYS.USER, data.id] });

                queryClient.setQueryData<IUser[]>([KEYS.USERS], oldData => {
                    if (!oldData) return [];

                    return oldData.map(user => (user.id === data.id ? { ...user, ...data } : user));
                });
            }
        },
    });
};

/** Хук для авторизации */
export const useAuth = (): UseMutationResult<TUserAuthResponse, Error, TUserAuthPayload> => {
    return useMutation<TUserAuthResponse, Error, TUserAuthPayload>({
        mutationKey: [KEYS.AUTH],
        mutationFn: async (data: TUserAuthPayload) => {
            return await userApi.authUser(data);
        },
    });
};

/** Хук для получения юзера по id */
export const useUserById = (id: number | null) => {
    return useQuery({
        queryKey: [KEYS.ME],
        queryFn: async () => {
            if (!id) return 
            return await userApi.getUserById(id);
        },
        enabled: !!id,
    });
};
