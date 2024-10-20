import { KF } from 'Common/consts/common';
import { TCabinType } from 'Common/types/flights';

export const getTicketPriceByKf = (price: number, cabinType: TCabinType | null): number => {
    if (!cabinType) return 0;
    let result;
    switch (cabinType) {
        case 'Economy':
            result = price;
            break;
        case 'Business':
            result = price * KF.BUSINESS;
            break;
        case 'First Class':
            result = price * KF.FIRST;
            break;
        default:
            result = price;
            break;
    }

    return Math.round(result);
};
