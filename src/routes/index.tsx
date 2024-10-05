import { Page } from 'Common/components/layout/Page';
import { Navigate, Route } from 'react-router-dom';
import { ROUTE_PATHS } from './config';
import { Routes } from 'react-router-dom';
import { useAuthContext } from 'Common/components/provider/Auth/context';
import { AuthPage } from 'Pages/Auth';
import { AdminRoutes } from 'Pages/Admin';
import { UserRoutes } from 'Pages/User';

export const AppRoutes = () => {
    const { isAuth, role } = useAuthContext();

    const getElement = () => {
        let route;
        let auth;

        if (!isAuth) {
            auth = <AuthPage />;
            route = <Navigate to={ROUTE_PATHS.AUTH.INDEX} />;
        } else if (role === 'Administrator') {
            route = <AdminRoutes />;
            auth = <Navigate to={ROUTE_PATHS.ADMIN.USERS.INDEX} />;
        } else if (role === 'User') {
            route = <UserRoutes />;
            auth = <Navigate to={ROUTE_PATHS.USER.LOGS.INDEX} />;
        } else {
            route = <NotFound />;
            auth = <Navigate to='/' />;
        }

        return { route, auth };
    };

    const { route, auth } = getElement();

    return (
        <Routes>
            <Route element={<Page />}>
                <Route element={auth} path={ROUTE_PATHS.AUTH.INDEX} />
                <Route element={route} path='/*' />
                <Route element={<NotFound />} path='*' />
            </Route>
        </Routes>
    );
};

const NotFound = () => {
    return <div>not found</div>;
};
