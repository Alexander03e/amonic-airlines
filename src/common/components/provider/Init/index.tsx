import { useQueryClient } from '@tanstack/react-query';
// import { useOffices } from 'Common/api/common/hooks';
import { KEYS } from 'Common/types/api';
import { IOffice } from 'Common/types/office';
import { PropsWithChildren } from 'react';
import { mockOffices } from './mocks';

export const InitProvider = ({ children }: PropsWithChildren) => {
    const queryClient = useQueryClient();

    /** TODO: Замоканные данные, убрать позже */
    queryClient.setQueryData<IOffice[]>([KEYS.OFFICES], mockOffices);

    // useOffices();

    return children;
};
