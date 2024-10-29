import { useState } from 'react';
import styles from './checkbox-group.module.scss';
import map from 'lodash/map';
import cn from 'classnames';

interface IOption {
    value: string;
    label: string;
}

interface IProps {
    options: IOption[];
    label?: string;
    onChange?: (value: string[]) => void;
    checkedDisabled?: string[];
    selectedOptions?: string[];
}

export const CheckboxGroup = ({
    options,
    checkedDisabled,
    label,
    onChange,
    selectedOptions,
}: IProps) => {
    const [selected, setSelected] = useState<string[]>(selectedOptions ?? []);

    const handleSelect = (value: string) => {
        if ((selectedOptions ? selectedOptions : selected).includes(value)) {
            if (selectedOptions && onChange) {
                onChange(selectedOptions.filter(item => item !== value));
                return;
            }
            setSelected(prev => {
                const newValue = prev.filter(item => item !== value);

                if (onChange) {
                    onChange(newValue);
                }

                return newValue;
            });

            return;
        }

        if (selectedOptions && onChange) {
            onChange([...selectedOptions, value]);
            return;
        }
        setSelected(prev => {
            const newValue = [...prev, value];

            if (onChange) {
                onChange(newValue);
            }

            return newValue;
        });
    };

    return (
        <fieldset className={styles.wrapper}>
            {label && <legend>{label}</legend>}

            {map(options, item => {
                return (
                    <label
                        className={cn(styles.label, {
                            [styles.disabled]: checkedDisabled?.includes(item.value),
                        })}
                    >
                        <span>{item.label}</span>
                        <input
                            disabled={checkedDisabled?.includes(item.value)}
                            checked={
                                (selectedOptions ?? selected)?.includes(item.value) ||
                                checkedDisabled?.includes(item.value)
                            }
                            onChange={() => handleSelect(item.value)}
                            type='checkbox'
                        />
                    </label>
                );
            })}
        </fieldset>
    );
};
