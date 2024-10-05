import { PropsWithChildren } from 'react';
import { useOffices, useRoles } from 'Common/api/common/hooks';

export const InitProvider = ({ children }: PropsWithChildren) => {
    useOffices();
    useRoles();

    return children;
};
