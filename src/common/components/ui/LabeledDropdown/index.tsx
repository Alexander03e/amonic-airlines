import { forwardRef } from 'react';
import Dropdown from 'react-dropdown';
import styles from './dropdown.module.scss';
import 'react-dropdown/style.css';
import { Height } from '../Animation';
import cn from 'classnames';
import { PLACEHOLDER } from './consts';

interface IProps {
    options: {
        value: string;
        label: string;
    }[];
    label?: string;
    onChange?: (value: unknown) => void;
    placeholder?: string;
    error?: string;
    value?: unknown;
}

export const LabeledDropdown = forwardRef<Dropdown, IProps>(
    ({ options, label, error, value, onChange, placeholder = PLACEHOLDER, ...props }, ref) => {
        const handleChange = (value: number | string) => {
            if (!onChange) return;

            onChange(String(value));
        };

        return (
            <div className={cn(styles.out, { [styles.errorOut]: error })}>
                {label && <span className={styles.label}>{label}</span>}
                <Dropdown
                    ref={ref}
                    value={value ? String(value) : undefined}
                    options={options}
                    placeholder={placeholder}
                    onChange={({ value }) => handleChange(value)}
                    placeholderClassName={styles.placeholder}
                    className={cn(styles.wrapper, { [styles.error]: error })}
                    controlClassName={styles.control}
                    menuClassName={styles.menu}
                    arrowClassName={styles.arrow}
                    {...props}
                />
                <Height isOpen={Boolean(error)}>
                    <span className={styles.errorSpan}>{error}</span>
                </Height>
            </div>
        );
    },
);
