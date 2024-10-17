import { ReactElement } from 'react';
import styles from './passengers-row.module.scss';

interface IProps {
    from: string;
    to: string;
    cabinType: string;
    date: string;
    flightNumber: string;
}
export const InfoRow = (data: IProps): ReactElement => {
    return (
        <div className={styles.row}>
            <p>
                Откуда:
                <span>{data.from}</span>
            </p>
            <p>
                Куда:
                <span>{data.to}</span>
            </p>
            <p>
                Тип билета:
                <span>{data.cabinType}</span>
            </p>
            <p>
                Дата:
                <span>{data.date}</span>
            </p>
            <p>
                Номер рейса
                <span>{data.flightNumber}</span>
            </p>
        </div>
    );
};
