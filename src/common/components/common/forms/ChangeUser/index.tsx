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
import { useUpdateUser } from 'Common/api/user/hooks';
import { IRole } from 'Common/types/role';
import { ERRORS } from 'Common/consts/errors';

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
            office: userData.office.id,
            role: userData.role.id,
        },
    });

    const { mutateAsync: updateUser, isError, isPending, isSuccess } = useUpdateUser();

    const onSubmit = async (data: TChangeUser) => {
        const { office, role, ...rest } = data;
        await updateUser({
            ...rest,
            id: userData.id,
            office: Number(office),
            role: role,
        });
    };

    const handleClose = () => {
        setCurrentModal(null);
    };

    const offices = queryClient.getQueryData<IOffice[]>([KEYS.OFFICES]);
    const roles = queryClient.getQueryData<IRole[]>([KEYS.ROLES]);

    const officeOptions = offices?.map(item => ({ value: String(item.id), label: item.title }));
    const rolesOptions = roles?.map(item => ({ value: item.id, name: item.title }));
    return (
        <Form
            info={isSuccess ? 'Данные изменены' : ''}
            label={TITLES.FORM}
            onSubmit={handleSubmit(onSubmit)}
            error={isError ? ERRORS.REQUEST_ERROR : ''}
        >
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
            <div className={styles.buttons}>
                <Button
                    disabled={isPending}
                    type='button'
                    onClick={handleClose}
                    label={LABELS.CANCEL}
                    fullWidth
                />
                <Button
                    disabled={isPending}
                    type='submit'
                    label={LABELS.SAVE}
                    fullWidth
                    variant='secondary'
                />
            </div>
        </Form>
    );
};
