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
import { useAddUser } from 'Common/api/user/hooks';
import { IRole } from 'Common/types/role';
import { RadioGroup } from 'Common/components/ui/RadioGroup';
import { ERRORS } from 'Common/consts/errors';
import { useAppStore } from 'Common/store/app';
import { useEffect } from 'react';

export const CreateUserForm = () => {
    const queryClient = useQueryClient();

    const { setCurrentModal } = useAppStore();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm<TSignUp>({ mode: 'onChange', resolver: zodResolver(schema) });

    const { mutate: addUser, isError, isSuccess } = useAddUser();

    const onSubmit = (data: TSignUp) => {
        const { birthdate, ...rest } = data;
        const formattedBirthdate = birthdate.split('.').reverse().join('-');
        addUser({ birthdate: formattedBirthdate, ...rest });
    };

    useEffect(() => {
        if (isSuccess) {
            setCurrentModal(null);
        }
    }, [isSuccess]);

    const offices = queryClient.getQueryData<IOffice[]>([KEYS.OFFICES]);
    const officeOptions = offices?.map(item => ({ value: String(item.id), label: item.title }));

    const roles = queryClient.getQueryData<IRole[]>([KEYS.ROLES]);
    const rolesOptions = roles?.map(item => ({ value: item.id, name: item.title }));

    return (
        <Form
            label={LABELS.FORM}
            buttonLabel={LABELS.BUTTON}
            className={styles.wrapper}
            onSubmit={handleSubmit(onSubmit)}
            error={isError ? ERRORS.REQUEST_ERROR : ''}
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

            <Controller
                control={control}
                name='role'
                render={({ field: { onChange, value } }) => (
                    <RadioGroup
                        error={errors.role?.message}
                        label={LABELS.ROLE}
                        items={rolesOptions}
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            <div className={styles.row}>
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
            </div>
        </Form>
    );
};
