import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { Button, Form, LabeledInput } from 'Common/components/ui';
import { useAppStore } from 'Common/store/app';
import { toast } from 'react-toastify';
import { useBlockUser } from 'Common/api/user/hooks';
import { IUser } from 'Common/types/user';

export const BlockUser = (): ReactElement => {
    const { setCurrentModal, modalData } = useAppStore();

    const userData = modalData as IUser;

    const [value, setValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setValue(value);
    };

    const { mutateAsync, isPending } = useBlockUser();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await mutateAsync({ blockingReason: value, user: userData.id });
        toast('Пользователь заблокирован');
        setCurrentModal(null);
    };

    return (
        <Form onSubmit={onSubmit} fitContent label='Блокировка пользователя'>
            <LabeledInput
                placeholder='Введите значение'
                label='Причина блокировки'
                onChange={handleChange}
            />

            <Button fullWidth label='Продолжить' isLoading={isPending} />
        </Form>
    );
};
