import { Th, Thead, Tr } from 'react-super-responsive-table';
import styles from './table-header.module.scss';
import map from 'lodash/map';
import { ReactElement } from 'react';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

interface IProps {
    data?: (string | number)[] | undefined;
}

export const TableHeader = ({ data }: IProps): ReactElement => {
    return (
        <Thead className={styles.wrapper}>
            <Tr>
                {map(data, (item, index) => {
                    return <Th key={index}>{item}</Th>;
                })}
            </Tr>
        </Thead>
    );
};
