import { ReactElement } from 'react';
import { Form, LabeledInput } from 'Common/components';
import { LABELS } from './consts';
import { schema, TSignIn } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const SignInForm = (): ReactElement => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<TSignIn>({ mode: 'onChange', resolver: zodResolver(schema) });

    const onSubmit = (data: TSignIn) => {
        console.log(data);
    };

    return (
        <Form buttonLabel={LABELS.BUTTON} onSubmit={handleSubmit(onSubmit)} label={LABELS.FORM}>
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
