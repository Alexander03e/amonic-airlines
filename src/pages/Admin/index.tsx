import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes/config';
import { MainPage } from './Main';
import { FlightsPage } from './Flights';
import { BookingPage } from './Booking';

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTE_PATHS.ADMIN.USERS.INDEX} element={<MainPage />} />
            <Route path={ROUTE_PATHS.ADMIN.FLIGHTS.INDEX} element={<FlightsPage />} />
            <Route path={ROUTE_PATHS.ADMIN.BOOKING.INDEX} element={<BookingPage />} />
            <Route path='/' element={<Navigate to={ROUTE_PATHS.ADMIN.USERS.INDEX} />} />
        </Routes>
    );
};
