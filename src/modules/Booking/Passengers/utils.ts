import { ITableRow } from 'Common/components/ui/Table/types';
import { IStorePassenger } from 'Common/store/booking/types';

export const getRows = (passengers: IStorePassenger[] | null): ITableRow[] | null => {
    if (!passengers) return null;

    return passengers.map(item => ({
        id: item.id,
        data: [
            item.firstName,
            item.lastName,
            item.birthdate,
            item.passport,
            item.passportCountry,
            item.phone,
        ],
    }));
};
