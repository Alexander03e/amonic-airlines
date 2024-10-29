import { forwardRef, InputHTMLAttributes, ReactElement } from 'react';
import styles from './LabeledInput.module.scss';
import cn from 'classnames';
import InputMask from '@mona-health/react-input-mask';
import { Height } from 'Common/components';

/**
 * Интерфейс компонента LabeledInput.
 * @prop {string} [label] - Текст лейбла.
 * @prop {string} [error] - Текст ошибки.
 * @prop {string} [mask] - Маска для инпута.
 */
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    mask?: string;
}

export const LabeledInput = forwardRef<HTMLInputElement, IProps>(
    (
        { label, error, mask, className, placeholder = 'Введите значение', ...props },
        ref,
    ): ReactElement => {
        const { disabled } = props;
        return (
            <label
                className={cn(styles.wrapper, className, {
                    [styles.error]: error,
                    [styles.disabled]: disabled,
                })}
            >
                {label && <span className={styles.label}>{label}</span>}
                {!mask ? (
                    <input placeholder={placeholder} ref={ref} {...props} />
                ) : (
                    <InputMask placeholder={placeholder} ref={ref} {...props} mask={mask} />
                )}
                <Height isOpen={Boolean(error)}>
                    <span className={styles.error}>{error}</span>
                </Height>
            </label>
        );
    },
);
