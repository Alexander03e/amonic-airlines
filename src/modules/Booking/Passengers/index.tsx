import { ReactElement } from 'react';
import styles from './booking-passengers.module.scss';
import { useBookingStore } from 'Common/store/booking';
import { InfoRow } from './components';

export const BookingPassengers = (): ReactElement => {
    const { selectedFlights, cabinType } = useBookingStore();

    console.log(cabinType);
    const { outbound, return: returnFlights } = selectedFlights ?? {};
    return (
        <div className={styles.wrapper}>
            {outbound && (
                <fieldset>
                    <legend>Исходящий рейс</legend>
                    <InfoRow
                        cabinType={cabinType ?? 'Эконом'}
                        date={outbound.date}
                        flightNumber={outbound.flightNumber}
                        from={outbound.route.departureAirport.iatacode}
                        to={outbound.route.arrivalAirport.iatacode}
                    />
                </fieldset>
            )}
            {returnFlights && (
                <fieldset>
                    <legend>Обратный рейс</legend>
                    <InfoRow
                        cabinType={cabinType ?? 'Эконом'}
                        date={returnFlights.date}
                        flightNumber={returnFlights.flightNumber}
                        from={returnFlights.route.departureAirport.iatacode}
                        to={returnFlights.route.arrivalAirport.iatacode}
                    />
                </fieldset>
            )}
        </div>
    );
};
