import { Button, Form } from 'Common/components/ui';
import styles from './confirm-payment.module.scss';
import { FormEvent, useState } from 'react';
import { RadioGroup } from 'Common/components/ui/RadioGroup';
import CancelIcon from 'Assets/icons/cancel.svg?react';
import { useAppStore } from 'Common/store/app';
import { useBookingStore } from 'Common/store/booking';
import { getTicketPriceByKf } from '../../../../utils/getTicketPriceByValue';
import { TicketsApi } from 'Common/api/tickets/api';
import { generateUniqueId } from 'Common/utils/generateRandomId';
import { useUserStore } from 'Common/store/user';
import { toast } from 'react-toastify';

const radioItems = [
    {
        name: 'Кредитная карта',
        value: 'credit_card',
    },
    {
        name: 'Ваучер',
        value: 'voucher',
    },
    {
        name: 'Наличка',
        value: 'cash',
    },
];

const ticketsApi = TicketsApi.getInstance();

export const ConfirmPayment = () => {
    const { setCurrentModal } = useAppStore();
    const { selectedFlights, cabinType, passengers, clear } = useBookingStore();
    const [selectedPayment, setSelectedPayment] = useState<unknown>(radioItems[0].value);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUserStore();
    console.log(user);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const uniqueId = generateUniqueId(6);
        setIsLoading(true);

        try {
            Object.values(selectedFlights).forEach(flight => {
                if (flight?.transfers) {
                    flight.transfers.forEach(transfer => {
                        passengers?.forEach(async passenger => {
                            await ticketsApi.newTicket({
                                bookingReference: uniqueId,
                                cabinType: String(flight?.cabinType?.id),
                                confirmed: true,
                                country: String(transfer.route.arrivalAirport.country.id),
                                email: null,
                                firstName: passenger.firstName,
                                lastName: passenger.lastName,
                                passportNumber: passenger.passport,
                                phone: passenger.phone,
                                schedule: String(transfer.id),
                                user: String(user?.id),
                            });
                        });
                    });

                    return;
                }

                passengers?.forEach(async passenger => {
                    await ticketsApi.newTicket({
                        bookingReference: uniqueId,
                        cabinType: String(flight?.cabinType?.id),
                        confirmed: true,
                        country: String(flight?.route.arrivalAirport.country.id),
                        email: null,
                        firstName: passenger.firstName,
                        lastName: passenger.lastName,
                        passportNumber: passenger.passport,
                        phone: passenger.phone,
                        schedule: String(flight?.id),
                        user: String(user?.id),
                    });
                });
            });
            clear();
            setCurrentModal(null);
            toast('Билеты успешно забронированы');
        } catch (e) {
            console.log(e);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const onChange = (value: unknown) => {
        setSelectedPayment(value);
    };

    const closeForm = () => {
        setCurrentModal(null);
    };

    const total = selectedFlights
        ? Object.values(selectedFlights).reduce((acc, item) => {
              if (item?.economyPrice) {
                  return acc + getTicketPriceByKf(item?.economyPrice, cabinType?.name ?? null);
              }

              return acc + 0;
          }, 0)
        : 0;

    return (
        <Form
            error={isError ? 'Произошла ошибка' : undefined}
            label='Подтверждение оплаты'
            onSubmit={onSubmit}
            className={styles.wrapper}
        >
            <p className={styles.paragraph}>
                Стоимость билетов: <span>{total}$</span>
            </p>
            <RadioGroup onChange={onChange} value={selectedPayment} items={radioItems} />
            <div className={styles.buttons}>
                <Button isLoading={isLoading} label='Получить билеты' fullWidth />
                <Button
                    onClick={closeForm}
                    type='button'
                    icon={<CancelIcon />}
                    variant='danger'
                    label='Отмена'
                    fullWidth
                />
            </div>
        </Form>
    );
};
