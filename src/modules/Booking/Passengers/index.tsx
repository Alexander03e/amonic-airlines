import { ReactElement } from 'react';
import styles from './booking-passengers.module.scss';
import { useBookingStore } from 'Common/store/booking';
import { InfoRow } from './components';

export const BookingPassengers = (): ReactElement => {
    const { selectedFlights } = useBookingStore();

    const { outbound, return: returnFlights } = selectedFlights ?? {};
    return (
        <div className={styles.wrapper}>
            {outbound && (
                <fieldset>
                    <legend>Исходящий рейс</legend>
                    <InfoRow
                        cabinType='cabin'
                        date='date'
                        flightNumber='fligh'
                        from='from'
                        to='to'
                    />
                </fieldset>
            )}
            {returnFlights && (
                <fieldset>
                    <legend>Обратный рейс</legend>
                    <InfoRow
                        cabinType='cabin'
                        date='date'
                        flightNumber='fligh'
                        from='from'
                        to='to'
                    />
                </fieldset>
            )}
        </div>
    );
};
