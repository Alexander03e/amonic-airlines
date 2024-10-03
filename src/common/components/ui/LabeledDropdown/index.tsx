import { forwardRef } from 'react';
import Dropdown from 'react-dropdown';
import styles from './dropdown.module.scss';
import 'react-dropdown/style.css';
import { Height } from '../Animation';
import cn from 'classnames';
import { PLACEHOLDER } from './consts';

interface IProps {
    options: string[];
    label?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    error?: string;
    value?: string;
}

export const LabeledDropdown = forwardRef<Dropdown, IProps>(
    ({ options, label, error, value, onChange, placeholder = PLACEHOLDER, ...props }, ref) => {
        const handleChange = (value: string) => {
            if (!onChange) return;
            onChange(value);
        };

        return (
            <div className={cn(styles.out, { [styles.errorOut]: error })}>
                {label && <span className={styles.label}>{label}</span>}
                <Dropdown
                    ref={ref}
                    value={value}
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
                    <span className={styles.error}>{error}</span>
                </Height>
            </div>
        );
    },
);
