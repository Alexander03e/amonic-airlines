import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { schema, TSignUp } from './schema';
import { Form, LabeledInput } from 'Common/components';
import { LABELS, MASKS } from './consts';
import styles from './sign-up.module.scss';
import { LabeledDropdown } from 'Common/components';
import { useQueryClient } from '@tanstack/react-query';
import { KEYS } from 'Common/types/api';
import { IOffice } from 'Common/types/office';
export const CreateUserForm = () => {
    const queryClient = useQueryClient();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm<TSignUp>({ mode: 'onChange', resolver: zodResolver(schema) });

    const onSubmit = (data: TSignUp) => {
        console.log(data);
    };

    const data = queryClient.getQueryData<IOffice[]>([KEYS.OFFICES]);
    const officeOptions = data?.map(item => item.title);

    return (
        <Form
            label={LABELS.FORM}
            buttonLabel={LABELS.BUTTON}
            className={styles.wrapper}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={styles.row}>
                <LabeledInput
                    {...register('firstName')}
                    label={LABELS.FIRST_NAME}
                    error={errors.firstName?.message}
                />
                <LabeledInput
                    {...register('lastName')}
                    label={LABELS.LAST_NAME}
                    error={errors.lastName?.message}
                />
            </div>
            <div className={styles.row}>
                <LabeledInput
                    {...register('email')}
                    label={LABELS.EMAIL}
                    error={errors.email?.message}
                />
                <LabeledInput
                    {...register('phone')}
                    label={LABELS.PHONE}
                    mask={MASKS.PHONE}
                    error={errors.phone?.message}
                />
            </div>

            <Controller
                control={control}
                name='office'
                render={({ field: { onChange, ref, value } }) => (
                    <LabeledDropdown
                        ref={ref}
                        error={errors.office?.message}
                        label={LABELS.OFFICE}
                        value={value}
                        onChange={onChange}
                        options={officeOptions ?? []}
                    />
                )}
            />

            <LabeledInput
                {...register('birthdate')}
                label={LABELS.BIRTHDATE}
                mask={MASKS.BIRTHDATE}
                error={errors.birthdate?.message}
            />
            <LabeledInput
                {...register('password')}
                label={LABELS.PASSWORD}
                type='password'
                error={errors.password?.message}
            />
        </Form>
    );
};
