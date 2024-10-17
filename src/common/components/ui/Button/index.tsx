import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './button.module.scss';
import { Loader } from '../Loader';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'empty' | 'success';
    fullWidth?: boolean;
    isActive?: boolean;
    icon?: ReactNode;
    isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({
    label,
    variant = 'primary',
    className,
    isActive,
    fullWidth,
    icon,
    isLoading,
    disabled,
    ...props
}) => {
    return (
        <button
            disabled={disabled || isLoading}
            className={cn(styles.button, styles[variant], className, {
                [styles.fullWidth]: fullWidth,
                [styles.active]: isActive,
            })}
            {...props}
        >
            {isLoading && <Loader />}
            {!isLoading && icon}
            {!isLoading && label}
        </button>
    );
};
