import { FormHTMLAttributes, ReactElement } from 'react';
import styles from './form.module.scss';
import cn from 'classnames';
import { Button, Height, Loader } from 'Common/components';

type IProps = FormHTMLAttributes<HTMLFormElement> & {
    buttonLabel?: string;
    label?: string;
    withoutButton?: boolean;
    loading?: boolean;
    error?: string;
};

export const Form = ({
    className,
    children,
    label,
    buttonLabel,
    withoutButton = false,
    loading = false,
    error,
    ...props
}: IProps): ReactElement => {
    return (
        <form className={cn(styles.wrapper, className)} {...props}>
            {label && (
                <div className={styles.header}>
                    <span>{label}</span>
                </div>
            )}
            <div className={styles.content}>
                {children}
                <Height isOpen={Boolean(error) || Boolean(loading)}>
                    <div className={styles.error}>{error || <Loader />}</div>
                </Height>
                {!withoutButton && buttonLabel && (
                    <Button fullWidth label={buttonLabel} variant='secondary' type='submit' />
                )}
            </div>
        </form>
    );
};
