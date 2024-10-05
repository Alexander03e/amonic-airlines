import { forwardRef, ReactElement } from 'react';
import styles from './radio-group.module.scss';
import map from 'lodash/map';
import cn from 'classnames';
import { Height } from '../Animation';

interface IProps {
    items:
        | {
              name: string;
              value: unknown;
          }[]
        | undefined;
    label?: string;
    onChange?: (value: unknown) => void;
    value: unknown;
    error?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, IProps>(
    ({ items, label, value, onChange, error }: IProps, ref): ReactElement => {
        const handleChange = (value: unknown) => {
            if (!onChange) return;

            onChange(value);
        };

        return (
            <div className={cn(styles.wrapper, { [styles.error]: error })} ref={ref}>
                {label && <span className={styles.title}>{label}</span>}
                <div className={styles.list}>
                    {map(items, item => {
                        const isActive = item.value === value;

                        return (
                            <div
                                onClick={handleChange.bind(this, item.value)}
                                className={cn(styles.itemWrapper, { [styles.active]: isActive })}
                            >
                                <span>{item.name}</span>
                                <div />
                            </div>
                        );
                    })}
                </div>
                <Height isOpen={Boolean(error)}>
                    <span className={styles.errorLabel}>{error}</span>
                </Height>
            </div>
        );
    },
);
