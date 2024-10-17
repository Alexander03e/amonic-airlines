import { KF } from 'Common/consts/common';
import { IFlightSchedule, TCabinType } from 'Common/types/flights';
import map from 'lodash/map';

export const getScheduleOptions = (
    schedules: IFlightSchedule[] | undefined,
    cabinType: TCabinType | null,
) => {
    if (schedules?.length === 0 || !schedules) {
        return [];
    }

    const getCabinPrice = (price: number) => {
        switch (cabinType) {
            case 'Economy':
                return price;
            case 'Business':
                return price * KF.BUSINESS;
            case 'First Class':
                return price * KF.FIRST;
            default:
                return price;
        }
    };

    return map(schedules, item => ({
        id: item.id,
        data: [
            item.route.departureAirport.iatacode,
            item.route.arrivalAirport.iatacode,
            item.date,
            item.time,
            item.flightNumber,
            `${getCabinPrice(item.economyPrice)}$`,
            0,
        ],
    }));
};
