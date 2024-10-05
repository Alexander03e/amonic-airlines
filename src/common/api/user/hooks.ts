import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IUser, TUserAuthPayload, TUserRegPayload, TUserUpdatePayload } from 'Common/types/user';
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
        queryFn: async () => await userApi.getUsers(),
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
export const useAuth = (data: TUserAuthPayload) => {
    return useQuery({ queryKey: [KEYS.AUTH], queryFn: () => userApi.authUser(data) });
};
