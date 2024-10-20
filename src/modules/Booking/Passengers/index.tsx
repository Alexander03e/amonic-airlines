import { ReactElement, useMemo, useState } from 'react';
import styles from './booking-passengers.module.scss';
import { useBookingStore } from 'Common/store/booking';
import { InfoRow } from './components';
import { FormProvider, useForm } from 'react-hook-form';
import { schema, TPassengersForm } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PassengersForm } from './components/Form';
import { Table } from 'Common/components/ui/Table';
import { HEADER } from './consts';
import { getRows } from './utils';
import { IStorePassenger } from 'Common/store/booking/types';
import { Button } from 'Common/components';
import RemoveUserIcon from 'Assets/icons/remove_user.svg?react';
import { Slide } from 'Common/components/ui/Animation';

export const BookingPassengers = (): ReactElement => {
    const { selectedFlights, passengers, setPassengers, removePassenger } = useBookingStore();
    const [selectedPassenger, setSelectedPassenger] = useState<IStorePassenger | null>(null);

    const handleSelect = (id: unknown) => {
        console.log(selectedPassenger?.id, id);
        if (selectedPassenger?.id === id) {
            setSelectedPassenger(null);

            return;
        }

        const findedPassenger = passengers?.find(item => String(item.id) === String(id)) ?? null;

        setSelectedPassenger(findedPassenger);
    };

    const { outbound, return: returnFlights } = selectedFlights ?? {};

    const methods = useForm<TPassengersForm>({ resolver: zodResolver(schema), mode: 'onChange' });

    const { handleSubmit, reset } = methods;

    const onSubmit = (data: TPassengersForm) => {
        setPassengers({ id: Date.now(), ...data });
        reset();
    };

    const onPassengerDelete = () => {
        removePassenger(selectedPassenger?.id);
        setSelectedPassenger(null);
    };

    const rows = useMemo(() => getRows(passengers), [passengers]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.wrapper}>
                    {outbound && (
                        <fieldset>
                            <legend>Исходящий рейс</legend>
                            <InfoRow
                                price={outbound.economyPrice}
                                cabinType={outbound.cabinType?.name ?? null}
                                date={outbound.date}
                                flightNumber={outbound.flightNumber}
                                from={outbound.route.departureAirport.iatacode}
                                to={outbound.route.arrivalAirport.iatacode}
                                time={outbound.time}
                                transferCount={outbound.transferCount}
                            />
                        </fieldset>
                    )}
                    {returnFlights && (
                        <fieldset>
                            <legend>Обратный рейс</legend>
                            <InfoRow
                                price={returnFlights.economyPrice}
                                cabinType={returnFlights.cabinType?.name ?? null}
                                date={returnFlights.date}
                                flightNumber={returnFlights.flightNumber}
                                from={returnFlights.route.departureAirport.iatacode}
                                to={returnFlights.route.arrivalAirport.iatacode}
                                time={returnFlights.time}
                                transferCount={returnFlights.transferCount}
                            />
                        </fieldset>
                    )}
                </div>
                <div className={styles.tableWrapper}>
                    <div className={styles.tableInner}>
                        <Table
                            className={styles.table}
                            rowOnClick={handleSelect}
                            activeRowId={selectedPassenger?.id}
                            header={HEADER}
                            rows={rows ?? []}
                        />
                        <div className={styles.tableButtons}>
                            <Slide
                                isOpen={
                                    Boolean(selectedPassenger) &&
                                    Boolean(passengers) &&
                                    passengers?.length !== 0
                                }
                            >
                                <Button
                                    type='button'
                                    variant='danger'
                                    icon={<RemoveUserIcon />}
                                    onClick={onPassengerDelete}
                                    label='Удалить пассажира'
                                />
                            </Slide>
                        </div>
                    </div>
                    <PassengersForm />
                </div>
            </form>
        </FormProvider>
    );
};
