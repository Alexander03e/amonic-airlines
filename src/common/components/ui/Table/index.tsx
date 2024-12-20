import { TableRow } from './Row';
import styles from './table.module.scss';
import map from 'lodash/map';
import { ITableRow } from './types';
import { Table as ResponsiveTable, Tbody } from 'react-super-responsive-table';
import { TableHeader } from './Header';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import cn from 'classnames';
import { Loader } from '../Loader';

interface IProps {
    rows: ITableRow[];
    activeRowId?: unknown;
    rowOnClick?: (id: unknown) => void;
    className?: string;
    header?: string[];
    isLoading?: boolean;
    isError?: boolean;
}

const Table = ({ rows, rowOnClick, activeRowId, header, isLoading, className }: IProps) => {
    const handleRowClick = (id: unknown) => {
        if (!rowOnClick) return;

        rowOnClick(id);
    };
    if (!rows[0]?.id) {
        return <p>Данные не найдены</p>;
    }
    return (
        <div className={cn(styles.out, className)}>
            <ResponsiveTable className={styles.wrapper}>
                {rows.length === 0 && !isLoading && (
                    <p style={{ whiteSpace: 'nowrap', marginBlock: '20px' }}>Данных нет</p>
                )}
                <TableHeader data={header} />
                <Tbody>
                    {isLoading && <Loader />}
                    {map(rows, row => {
                        return (
                            <TableRow
                                onClick={handleRowClick.bind(this, row.id)}
                                isActive={activeRowId === row.id}
                                key={row.id as string}
                                isEdited={row.isEdited}
                                {...row}
                            />
                        );
                    })}
                </Tbody>
            </ResponsiveTable>
        </div>
    );
};

export { Table };
