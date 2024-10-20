import { Button, LabeledInput } from 'Common/components';
import { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { TPassengersForm } from '../../schema';
import styles from './passengers-form.module.scss';
import { useBookingStore } from 'Common/store/booking';
import AddUserIcon from 'Assets/icons/add_user.svg?react';
import { useAppStore } from 'Common/store/app';

export const PassengersForm = (): ReactElement => {
    const {
        register,
        formState: { errors },
    } = useFormContext<TPassengersForm>();

    const { setCurrentModal } = useAppStore();

    const onConfirmPayment = () => {
        setCurrentModal('#confirmPayment');
    };

    const { passengers } = useBookingStore();

    return (
        <div className={styles.wrapper}>
            <fieldset className={styles.fieldset}>
                <legend>Данные пассажира</legend>
                <div className={styles.row}>
                    <LabeledInput
                        placeholder='Имя'
                        {...register('firstName')}
                        error={errors.firstName?.message}
                    />
                    <LabeledInput
                        placeholder='Фамилия'
                        {...register('lastName')}
                        error={errors.lastName?.message}
                    />
                    <LabeledInput
                        type='date'
                        placeholder='Дата рождения'
                        {...register('birthdate')}
                        error={errors.birthdate?.message}
                    />
                    <LabeledInput
                        placeholder='Номер паспорта'
                        {...register('passport')}
                        error={errors.passport?.message}
                    />
                    <LabeledInput
                        placeholder='Страна выдачи паспорта'
                        {...register('passportCountry')}
                        error={errors.passportCountry?.message}
                    />
                    <LabeledInput
                        placeholder='Телефон'
                        {...register('phone')}
                        error={errors.phone?.message}
                    />
                </div>
                <div className={styles.buttons}>
                    <Button
                        icon={<AddUserIcon />}
                        fullWidth
                        type='submit'
                        label='Добавить пассажира'
                    />
                    <Button
                        type='button'
                        fullWidth
                        variant='success'
                        onClick={onConfirmPayment}
                        label='Подтвердить оплату'
                        disabled={!passengers || passengers.length === 0}
                    />
                </div>
            </fieldset>
        </div>
    );
};
