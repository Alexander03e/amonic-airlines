import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, ReactElement } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const QueryProvider = ({ children }: PropsWithChildren): ReactElement => {
    const client = new QueryClient();

    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools client={client} />
        </QueryClientProvider>
    );
};
