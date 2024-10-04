import { useQuery } from '@tanstack/react-query';
import { UserQueryOptions } from './options';

const queryOptions = UserQueryOptions.getInstance();

/** Хук для получения всех пользователей */
export const useUsers = () => {
    return useQuery(queryOptions.getUsers());
};

