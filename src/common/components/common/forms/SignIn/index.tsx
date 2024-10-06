import { ReactElement, useState } from 'react';
import { Form, LabeledInput } from 'Common/components';
import { LABELS } from './consts';
import { schema, TSignIn } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuthContext } from 'Common/components/provider/Auth/context';
import styles from './sign-in.module.scss';
import { useAuth } from 'Common/api/user/hooks';
import { ERRORS } from 'Common/consts/errors';
import { useUserLogsUpdate } from 'Common/api/logs/hooks';

export const SignInForm = (): ReactElement => {
    const [formError, setFormError] = useState('');
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<TSignIn>({ mode: 'onChange', resolver: zodResolver(schema) });

    const { login } = useAuthContext();
    const { mutate: updateUserLogs } = useUserLogsUpdate();

    const { mutateAsync: authUser, isError } = useAuth();

    const onSubmit = async (data: TSignIn) => {
        const response = await authUser(data);

        const { status, user } = response;

        if (status === 'ACCESS ACCEPT') {
            const formattedLogin = `${user.role.title}/id_${user.id}`;
            updateUserLogs({ logInTime: new Date().toISOString(), user: user.id });
            login(formattedLogin);
        } else if (status === 'INCORRECT PASSWORD') {
            setFormError(ERRORS.REQUEST_INVALID_PASSWORD);
        } else if (isError) {
            setFormError(ERRORS.REQUEST_INVALID_PASSWORD);
        } else if (!response) {
            setFormError(ERRORS.CHECK_DATA);
        } else {
            setFormError(String(status));
        }
    };

    return (
        <Form
            error={formError}
            buttonLabel={LABELS.BUTTON}
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            label={LABELS.FORM}
        >
            <LabeledInput
                {...register('email')}
                label={LABELS.EMAIL}
                error={errors.email?.message}
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
