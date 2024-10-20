import { ReactElement } from 'react';
import styles from './passengers-row.module.scss';
import { getTicketPriceByKf } from '../../../../../common/utils/getTicketPriceByValue';
import { TCabinType } from 'Common/types/flights';
import { getClassByValue } from 'Common/utils/getClassByValue';

interface IProps {
    from: string;
    to: string;
    cabinType: TCabinType | null;
    date: string;
    flightNumber: string;
    time: string;
    price: number;
    transferCount?: number;
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
                <span>{getClassByValue(data.cabinType)}</span>
            </p>
            <p>
                Дата:
                <span>{data.date}</span>
            </p>
            <p>
                Номер рейса
                <span>{data.flightNumber}</span>
            </p>
            <p>
                Время вылета:
                <span>{data.time}</span>
            </p>
            <p>
                Цена:
                <span>{getTicketPriceByKf(Number(data.price), data.cabinType)}$</span>
            </p>
            {data?.transferCount && (
                <p>
                    Пересадок:
                    <span>{data.transferCount}</span>
                </p>
            )}
        </div>
    );
};
