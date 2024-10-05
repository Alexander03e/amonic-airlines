import { ReactElement } from 'react';
import styles from './row.module.scss';
import { getAgeByBirthday } from 'Common/utils/getAgeByBirthday';
import cn from 'classnames';
import { TUserRow } from '../../types';
import isString from 'lodash/isString';

interface IProps extends TUserRow {
    onSelect?: (id: number) => void;
    isSelected?: boolean;
    className?: string;
    disabled?: boolean;
}

export const Row = ({
    onSelect,
    isSelected,
    className,
    disabled,
    ...user
}: IProps): ReactElement => {
    const { birthdate, email, firstName, lastName, office, role, active, id } = user;

    const age = !disabled ? getAgeByBirthday(birthdate) : birthdate;

    const handleSelect = () => {
        if (!onSelect || disabled) return;

        onSelect(id as number);
    };

    return (
        <div
            tabIndex={0}
            onClick={handleSelect}
            className={cn(styles.row, className, {
                [styles.selected]: isSelected,
                [styles.notActive]: !active,
                [styles.disabled]: disabled,
            })}
        >
            {!isString(active) ? <span className={styles.active} /> : <span>{active}</span>}
            <span className={styles.id}>{id}</span>
            <span className={styles.name}>{firstName}</span>
            <span className={styles.last}>{lastName}</span>
            <span className={styles.age}>{age}</span>
            <span className={styles.role}>{role}</span>
            <span className={styles.email}>{email}</span>
            <span className={styles.office}>{office}</span>
        </div>
    );
};
