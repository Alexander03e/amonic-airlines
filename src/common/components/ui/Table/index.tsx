import { TableRow } from './Row';
import styles from './table.module.scss';
import map from 'lodash/map';
import { ITableRow } from './types';
import { Table as ResponsiveTable, Tbody } from 'react-super-responsive-table';
import { TableHeader } from './Header';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

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

    console.log(rows);

    return (
        <div className={styles.out}>
            <ResponsiveTable className={styles.wrapper}>
                <TableHeader data={header} />
                <Tbody>
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

Table.Row = TableRow;

export { Table };
