import { ReactElement, useState } from 'react';
import styles from './change-schedule.module.scss';
import { Button, Form, LabeledInput } from 'Common/components/ui';
import { LABELS } from './consts';
import { useModalStore } from 'Common/store/app/selectors';
import { IFlightSchedule } from 'Common/types/flights';
import { useForm } from 'react-hook-form';
import { schema, TScheduleForm } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdatedScheduleStore } from 'Common/store/schedule';

export const ChangeSchedule = (): ReactElement => {
    const { modalData, setCurrentModal, setModalData } = useModalStore();
    const setSchedule = useUpdatedScheduleStore(state => state.setSchedule);
    const [isSaved, setSaved] = useState(false);
    const scheduleData = modalData as IFlightSchedule;

    // const { mutateAsync, isError, isSuccess } = useUpdateSchedule();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<TScheduleForm>({
        mode: 'onChange',
        resolver: zodResolver(schema),
        defaultValues: {
            date: scheduleData.date,
            time: scheduleData.time,
            economy: String(scheduleData?.economyPrice),
        },
    });

    const onSubmit = async (data: TScheduleForm) => {
        // await mutateAsync({
        //     id: scheduleData.id,
        //     date: data.date,
        //     economyPrice: +data.economy,
        //     time: data.time,
        // });
        setSaved(false);
        setSchedule({
            id: scheduleData.id,
            item: {
                action: 'EDIT',
                aircraft: scheduleData.aircraft.id,
                date: data.date,
                arrivalAirport: scheduleData.route.arrivalAirport.iatacode,
                departureAirport: scheduleData.route.departureAirport.iatacode,
                confirmed: scheduleData.confirmed,
                economyPrice: +data.economy,
                time: data.time,
                flightNumber: scheduleData.flightNumber,
            },
        });

        setSaved(true);
    };

    const handleClose = () => {
        setCurrentModal(null);
        setModalData(null);
    };

    return (
        <Form
            info={isSaved ? 'Данные изменены' : ''}
            onSubmit={handleSubmit(onSubmit)}
            label={LABELS.FORM}
        >
            <fieldset className={styles.info}>
                <legend>{LABELS.ROUTE}</legend>
                <div className={styles.row}>
                    <p>
                        {LABELS.FROM}: <span>{scheduleData.route.departureAirport.iatacode}</span>
                    </p>
                    <p>
                        {LABELS.TO}: <span>{scheduleData.route.arrivalAirport.iatacode}</span>
                    </p>
                    <p>
                        {LABELS.AICRAFT_MODEL}: <span>{scheduleData.aircraft.makeModel}</span>
                    </p>
                </div>
            </fieldset>

            <div className={styles.inputs}>
                <LabeledInput
                    error={errors.date?.message}
                    {...register('date')}
                    type='date'
                    label={LABELS.DATE}
                />
                <LabeledInput
                    error={errors.time?.message}
                    {...register('time')}
                    label={LABELS.DEPARTURE_TIME}
                />
                <LabeledInput
                    error={errors.economy?.message}
                    {...register('economy')}
                    label={LABELS.ECONOMY_PRICE}
                />
            </div>

            <div className={styles.bottom}>
                <Button type='submit' fullWidth label={LABELS.BUTTON_UPDATE} variant='secondary' />
                <Button
                    type='button'
                    onClick={handleClose}
                    fullWidth
                    label={LABELS.BUTTON_CANCEL}
                />
            </div>
        </Form>
    );
};
