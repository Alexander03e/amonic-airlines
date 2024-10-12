import styles from './row.module.scss';
import map from 'lodash/map';
import cn from 'classnames';
import { Td, Tr } from 'react-super-responsive-table';

type TProps = {
    data?: (string | number)[] | undefined;
    onClick?: () => void;
    isActive?: boolean;
    isError?: boolean;
    isWarn?: boolean;
    isSuccess?: boolean;
};

export const TableRow = ({ data, onClick, isActive, isError, isSuccess, isWarn }: TProps) => {
    if (!data) return null;

    return (
        <Tr
            className={cn(styles.row, {
                [styles.active]: isActive,
                [styles.warn]: isWarn,
                [styles.error]: isError,
                [styles.success]: isSuccess,
            })}
            onClick={onClick}
        >
            {map(data, (item, index) => {
                return <Td key={index}>{item}</Td>;
            })}
        </Tr>
    );
};
