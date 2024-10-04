import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IUser, TUserAuthPayload, TUserRegPayload } from 'Common/types/user';
import { KEYS } from 'Common/types/api';
import { UserApi } from './api';

const userApi = UserApi.getInstance();

/** Хук для добавления пользователя */
export const useAddUser = (data: TUserRegPayload) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => userApi.addUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [KEYS.USERS] });
        },
    });
};

/** Хук для получения всех пользователей */
export const useUsers = () => {
    return useQuery({
        queryKey: [KEYS.USERS],
        queryFn: userApi.getUsers,
    });
};

/** Хук для изменения пользователя */
export const useUpdateUser = (data: Partial<IUser>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => userApi.updateUser(data),
        onSuccess: () => {
            console.log('re');
            queryClient.invalidateQueries({ queryKey: [KEYS.USER, data.id] });
        },
    });
};

/** Хук для авторизации */
export const useAuth = (data: TUserAuthPayload) => {
    return useQuery({ queryKey: [KEYS.AUTH], queryFn: () => userApi.authUser(data) });
};
