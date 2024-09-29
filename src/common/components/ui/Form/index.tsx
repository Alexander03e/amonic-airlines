import { FormHTMLAttributes, ReactElement } from 'react';
import styles from './form.module.scss';
import cn from 'classnames';
import { Button } from 'Common/components';

type IProps = FormHTMLAttributes<HTMLFormElement> & {
    buttonLabel?: string;
    label?: string;
    withoutButton?: boolean;
};

export const Form = ({
    className,
    children,
    label,
    buttonLabel,
    withoutButton = false,
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

                {!withoutButton && buttonLabel && (
                    <Button fullWidth label={buttonLabel} variant='secondary' type='submit' />
                )}
            </div>
        </form>
    );
};
