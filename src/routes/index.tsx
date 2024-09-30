import { Page } from 'Common/components/layout/Page';
import { Navigate, Route } from 'react-router-dom';
import { PATHS } from './config';
import { AuthPage } from 'Pages/Auth';
import { MainPage } from 'Pages/Main';
import { Routes } from 'react-router-dom';
import { useAuthContext } from 'Common/components/provider/Auth/context';

export const AppRoutes = () => {
    const { isAuth } = useAuthContext();

    const home = isAuth ? <MainPage /> : <Navigate to={PATHS.AUTH} />;

    const auth = isAuth ? <Navigate to={PATHS.MAIN} /> : <AuthPage />;

    return (
        <Routes>
            <Route element={<Page />}>
                <Route element={auth} path={PATHS.AUTH} />
                <Route element={home} path={PATHS.MAIN} />
            </Route>
        </Routes>
    );
};
