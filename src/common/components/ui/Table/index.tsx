import { TableRow } from './Row';
import styles from './table.module.scss';
import map from 'lodash/map';
import { ITableRow } from './types';

interface IProps {
    rows: ITableRow[];
    activeRowId?: unknown;
    rowOnClick?: (id: unknown) => void;
    header?: string[];
}

const Table = ({ rows, rowOnClick, activeRowId, header }: IProps) => {
    const handleRowClick = (id: unknown) => {
        if (!rowOnClick) return;

        rowOnClick(id);
    };

    return (
        <table className={styles.wrapper}>
            <TableRow data={header} isHeader />
            <tbody>
                {map(rows, row => {
                    return (
                        <TableRow
                            onClick={handleRowClick.bind(this, row.id)}
                            isActive={activeRowId === row.id}
                            key={row.id as string}
                            {...row}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};

Table.Row = TableRow;

export { Table };
