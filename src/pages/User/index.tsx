import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS } from 'Src/routes/config';
import { LogsPage } from './Logs';

export const UserRoutes = (): ReactElement => {
    return (
        <Routes>
            <Route path={ROUTE_PATHS.USER.LOGS.INDEX} element={<LogsPage />} />
            <Route path='/' element={<Navigate to={ROUTE_PATHS.USER.LOGS.INDEX} />} />
        </Routes>
    );
};
