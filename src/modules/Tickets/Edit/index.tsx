import { Button, LabeledDropdown, LabeledInput } from 'Common/components';
import styles from './tickets.module.scss';
import { CheckboxGroup } from 'Common/components/ui/CheckboxGroup';
import { useEffect, useMemo, useState } from 'react';
import { useAmenities, useAmenitiesCabinType, useTickets } from 'Common/api/tickets/hooks';
import { getAmenitiesOptions, getTicketsOptions } from './utils';
import { useTicketStore } from 'Common/store/tickets';
import SearchIcon from 'Assets/icons/search.svg?react';
import { getClassByValue } from '../../../common/utils/getClassByValue';
import { toast } from 'react-toastify';

export const TicketsEdit = () => {
    const [bookingRefValue, setBookingRefValue] = useState('');
    const [selectedTicket, setSelectedTicket] = useState('');

    const { data: amenityByCabinData } = useAmenitiesCabinType();

    const { setBookingReference, bookingReference, currentTicket, setCurrentTickets } =
        useTicketStore();

    const checkedAmenities =
        (currentTicket && amenityByCabinData?.[currentTicket?.cabinType.name])?.map(item =>
            String(item.id),
        ) || [];

    const { data: amenitiesData } = useAmenities();

    const { data: ticketsData, isLoading: ticketsLoading } = useTickets(bookingReference ?? '');

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const ticketsOptions = getTicketsOptions(ticketsData || []);
    const amenitiesOptions = getAmenitiesOptions(amenitiesData || []);

    const handleSetBookingReference = () => {
        setBookingReference(bookingRefValue);

        setCurrentTickets(null);
    };

    const handleChange = (value: string[]) => {
        setSelectedOptions(value);
    };

    const handleChangeTicket = () => {
        const findedValue = ticketsData?.find(item => String(item.id) === String(selectedTicket));

        if (findedValue) {
            setCurrentTickets(findedValue);
        }
    };

    const selectedOptionsPrice = useMemo(
        () =>
            selectedOptions.reduce((acc, value) => {
                const item = amenitiesData?.find(item => String(item.id) === value);
                return item ? acc + item.price : acc;
            }, 0),
        [selectedOptions, amenitiesData],
    );

    const handleReset = () => {
        setSelectedOptions([]);
    };

    useEffect(() => {
        setSelectedOptions([]);
    }, [currentTicket]);

    const ticketIsAvailable =
        currentTicket &&
        (() => {
            const currentDateTime = new Date();
            const flightDateTime = new Date(
                `${currentTicket.schedule.date}T${currentTicket.schedule.time}`,
            );
            const timeDifference = flightDateTime.getTime() - currentDateTime.getTime();
            const hoursDifference = timeDifference / (1000 * 60 * 60);
            return hoursDifference > 24;
        })();

    const makeReport = () => {
        if (!currentTicket) return;

        toast.success(
            `Заявка на изменение дополнительных услуг ${currentTicket.schedule.flightNumber} отправлена!`,
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <LabeledInput
                    value={bookingRefValue}
                    onChange={e => setBookingRefValue(e.target.value as string)}
                    className={styles.input}
                    label='Номер бронирования'
                />
                <Button
                    onClick={handleSetBookingReference}
                    variant='secondary'
                    label='Найти'
                    fullWidth
                    icon={<SearchIcon />}
                />
            </div>

            {!!bookingReference &&
                ticketsOptions &&
                (ticketsData?.length && !ticketsLoading ? (
                    <fieldset className={styles.flights}>
                        <legend>Доступные рейсы</legend>

                        <LabeledDropdown
                            onChange={value => setSelectedTicket(value as string)}
                            options={ticketsOptions}
                            label='Выберите рейс'
                        />

                        <Button onClick={handleChangeTicket} label='Показать конфигурацию' />
                    </fieldset>
                ) : (
                    'Ничего не найдено'
                ))}
            {!ticketIsAvailable && currentTicket && <p>Изменения текущего рейса невозможны</p>}

            {Boolean(currentTicket && ticketsData?.length) && (
                <>
                    <fieldset className={styles.info}>
                        <legend>Информация о пассажире</legend>

                        <p>
                            Полное имя: {currentTicket?.firstName} {currentTicket?.lastName}{' '}
                        </p>
                        <p>Номер паспорта: {currentTicket?.passportNumber}</p>
                        <p>Тип места: {getClassByValue(currentTicket?.cabinType.name)}</p>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Конфигурация билета для рейса №{currentTicket?.schedule.flightNumber}
                        </legend>

                        <CheckboxGroup
                            selectedOptions={selectedOptions}
                            checkedDisabled={checkedAmenities}
                            options={amenitiesOptions}
                            onChange={handleChange}
                        />
                    </fieldset>

                    <fieldset>
                        <p>Стоимость выбранных опций: {selectedOptionsPrice} $</p>

                        <div className={styles.saveOptions}>
                            <Button
                                onClick={makeReport}
                                type='button'
                                label='Сохранить опции'
                                fullWidth
                                disabled={!selectedOptions?.length}
                            />
                            <Button
                                type='button'
                                label='Сбросить'
                                variant='danger'
                                onClick={handleReset}
                                fullWidth
                            />
                        </div>
                    </fieldset>
                </>
            )}
        </div>
    );
};
