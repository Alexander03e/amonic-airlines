import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { schema, TSignUp } from './schema';
import { Form, LabeledInput } from 'Common/components';
import { LABELS, MASKS } from './consts';
import styles from './sign-up.module.scss';

export const SignUpForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<TSignUp>({ mode: 'onChange', resolver: zodResolver(schema) });

    const onSubmit = (data: TSignUp) => {
        console.log(data);
    };

    return (
        <Form
            label={LABELS.FORM}
            buttonLabel={LABELS.BUTTON}
            className={styles.wrapper}
            onSubmit={handleSubmit(onSubmit)}
        >
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
