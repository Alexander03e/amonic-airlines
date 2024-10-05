import { ReactElement } from 'react';
import { Form, LabeledInput } from 'Common/components';
import { LABELS } from './consts';
import { schema, TSignIn } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuthContext } from 'Common/components/provider/Auth/context';
import styles from './sign-in.module.scss';

export const SignInForm = (): ReactElement => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<TSignIn>({ mode: 'onChange', resolver: zodResolver(schema) });

    const { login } = useAuthContext();

    const onSubmit = (data: TSignIn) => {
        login('Administrator/mock_token');
        console.log(data);
    };

    return (
        <Form
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
