import { ReactElement, useState } from 'react';
import styles from './create-schedule.module.scss';
import { Button, Form, LabeledDropdown, LabeledInput } from 'Common/components/ui';
import { LABELS } from './consts';
import { useModalStore } from 'Common/store/app/selectors';
import { Controller, useForm } from 'react-hook-form';
import { schema, TCreateScheduleForm } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAircrafts } from 'Common/api/common/hooks';
import { useCreateSchedule, useRoutes } from 'Common/api/shedules/hooks';
export const CreateSchedule = (): ReactElement => {
    const { setCurrentModal, setModalData } = useModalStore();
    const [isSaved, setSaved] = useState(false);

    const { mutateAsync } = useCreateSchedule();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm<TCreateScheduleForm>({
        mode: 'onChange',
        resolver: zodResolver(schema),
    });

    const { data: routesData } = useRoutes();

    const onSubmit = async (data: TCreateScheduleForm) => {
        await mutateAsync({
            aircraft: +data.aircraft,
            confirmed: Boolean(data.confirmed),
            date: data.date,
            economyPrice: +data.economy,
            flightNumber: data.flightNumber,
            route: +data.route,
            time: data.time,
        });

        setSaved(true);
        reset();
    };

    const handleClose = () => {
        setCurrentModal(null);
        setModalData(null);
    };

    const { data: aircraftsData } = useAircrafts();

    const routesOptions = routesData?.map(item => ({
        value: String(item.id),
        label: `${item.departureAirport.iatacode} - ${item.arrivalAirport.iatacode}, ${item.distance} км, ${item.flightTime} мин`,
    }));

    const aircraftsOptions = aircraftsData?.map(item => ({
        value: String(item.id),
        label: item.name,
    }));

    return (
        <Form
            info={isSaved ? 'Маршрут добавлен' : ''}
            onSubmit={handleSubmit(onSubmit)}
            label={LABELS.FORM}
        >
            <div className={styles.inputs}>
                <LabeledInput
                    error={errors.date?.message}
                    {...register('date')}
                    type='date'
                    label={LABELS.DATE}
                />
                <div className={styles.row}>
                    <LabeledInput
                        error={errors.time?.message}
                        {...register('time')}
                        placeholder='ЧЧ:ММ'
                        type='time'
                        label={LABELS.DEPARTURE_TIME}
                    />
                    <LabeledInput
                        placeholder='100'
                        error={errors.economy?.message}
                        {...register('economy')}
                        label={LABELS.ECONOMY_PRICE}
                    />
                </div>
                <div className={styles.row}>
                    <LabeledInput
                        placeholder='49'
                        error={errors.flightNumber?.message}
                        {...register('flightNumber')}
                        label='Номер рейса'
                    />
                    <Controller
                        name='aircraft'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <LabeledDropdown
                                error={errors.aircraft?.message}
                                onChange={onChange}
                                label='Модель самолета'
                                value={value}
                                options={aircraftsOptions ?? []}
                            />
                        )}
                    />
                </div>
                <Controller
                    name='route'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <LabeledDropdown
                            error={errors.route?.message}
                            onChange={onChange}
                            label='Маршрут'
                            value={value}
                            options={routesOptions ?? []}
                        />
                    )}
                />
                <Controller
                    name='confirmed'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <fieldset className={styles.row}>
                            <legend>Подтвержден ли рейс</legend>
                            <label htmlFor='confirmed'>
                                {value ? 'Отменить' : 'Подтвердить'} рейс
                            </label>
                            <input
                                id='confirmed'
                                name='confirmed'
                                checked={!!value}
                                onChange={onChange}
                                type='checkbox'
                            />
                        </fieldset>
                    )}
                />
            </div>

            <div className={styles.bottom}>
                <Button type='submit' fullWidth label={LABELS.BUTTON_ADD} variant='secondary' />
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
