import { useQuery } from '@tanstack/react-query';
import { CommonQueryOptions } from './options';

const queryOptions = CommonQueryOptions.getInstance();

export const useOffices = () => {
    return useQuery(queryOptions.getOffices());
};
