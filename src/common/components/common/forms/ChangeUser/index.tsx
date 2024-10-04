import { Button, Form, LabeledDropdown, LabeledInput } from 'Common/components/ui';
import { Controller, useForm } from 'react-hook-form';
import { schema, TChangeUser } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { LABELS } from 'Common/consts/common';
import { useAppStore } from 'Common/store/app';
import { IUser } from 'Common/types/user';
import { RadioGroup } from 'Common/components/ui/RadioGroup';
import { TITLES } from './consts';
import styles from './change-user.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { KEYS } from 'Common/types/api';
import { IOffice } from 'Common/types/office';

const mockRadio = [
    {
        name: 'Administrator',
        value: 'Administrator',
    },
    {
        name: 'User',
        value: 'User',
    },
];

export const ChangeUser = () => {
    const queryClient = useQueryClient();
    const { modalData, setCurrentModal } = useAppStore();

    const userData = modalData as IUser;

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm<TChangeUser>({
        mode: 'onChange',
        resolver: zodResolver(schema),
        defaultValues: {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            office: String(userData.office.title),
            role: userData.role.title,
        },
    });

    const onSubmit = (data: TChangeUser) => {
        console.log(data);
        setCurrentModal(null);
    };

    const handleClose = () => {
        setCurrentModal(null);
    };

    const data = queryClient.getQueryData<IOffice[]>([KEYS.OFFICES]);
    const officeOptions = data?.map(item => item.title);
    return (
        <Form label={TITLES.FORM} onSubmit={handleSubmit(onSubmit)}>
            <LabeledInput
                error={errors.email?.message}
                {...register('email')}
                label={LABELS.EMAIL}
            />
            <LabeledInput
                error={errors.firstName?.message}
                {...register('firstName')}
                label={LABELS.FIRST_NAME}
            />
            <LabeledInput
                error={errors.lastName?.message}
                {...register('lastName')}
                label={LABELS.LAST_NAME}
            />
            <Controller
                control={control}
                name='office'
                render={({ field: { onChange, ref, value } }) => (
                    <LabeledDropdown
                        ref={ref}
                        label={LABELS.OFFICE}
                        error={errors.office?.message}
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
                        items={mockRadio}
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            <div className={styles.buttons}>
                <Button type='button' onClick={handleClose} label={LABELS.CANCEL} fullWidth />
                <Button type='submit' label={LABELS.SAVE} fullWidth variant='secondary' />
            </div>
        </Form>
    );
};
