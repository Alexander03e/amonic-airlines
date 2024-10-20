import styles from './row.module.scss';
import map from 'lodash/map';
import cn from 'classnames';
import { Td, Tr } from 'react-super-responsive-table';
import { memo } from 'react';

type TProps = {
    data?: (string | number | undefined)[] | undefined;
    onClick?: () => void;
    isActive?: boolean;
    isError?: boolean;
    isWarn?: boolean;
    isSuccess?: boolean;
    isEdited?: boolean;
};

export const TableRow = memo(
    ({ data, onClick, isActive, isError, isSuccess, isWarn, isEdited }: TProps) => {
        console.log('tet');
        if (!data) return null;

        return (
            <Tr
                className={cn(styles.row, {
                    [styles.active]: isActive,
                    [styles.warn]: isWarn,
                    [styles.error]: isError,
                    [styles.success]: isSuccess,
                    [styles.edited]: isEdited,
                })}
                onClick={onClick}
            >
                {map(data, (item, index) => {
                    return <Td key={index}>{item ?? '-'}</Td>;
                })}
            </Tr>
        );
    },
);
