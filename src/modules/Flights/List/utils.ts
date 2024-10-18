import { IFlightSchedule } from 'Common/types/flights';
import map from 'lodash/map';

export const getRows = (data?: IFlightSchedule[]) => {
    return map(data, item => {
        const data = [
            item.date,
            item.time,
            item.route.departureAirport.iatacode,
            item.route.arrivalAirport.iatacode,
            item.flightNumber,
            item.aircraft.makeModel,
            `${item.economyPrice}$`,
            `${Math.round(Number(item.economyPrice) * 1.3)}$`,
            `${Math.round(Number(item.economyPrice) * 1.755)}$`,
        ];

        return {
            isError: !item.confirmed,
            id: item.id,
            data: data,
        };
    });
};
