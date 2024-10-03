import { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames';
import styles from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'empty';
    fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
    label,
    variant = 'primary',
    className,
    fullWidth,
    ...props
}) => {
    return (
        <button
            className={cn(styles.button, styles[variant], className, {
                [styles.fullWidth]: fullWidth,
            })}
            {...props}
        >
            {label}
        </button>
    );
};
