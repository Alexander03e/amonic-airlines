import { ITicket } from 'Common/types/booking';
import { IOption } from 'Common/types/common';
import { IAmenity } from 'Common/types/tickets';

export const getAmenitiesOptions = (data: IAmenity[]): IOption[] => {
    return data?.map(item => ({
        value: item.id.toString(),
        label: item.service,
    }));
};

export const getTicketsOptions = (data: ITicket[]): IOption[] | undefined => {
    if (!data) return;

    return data?.map(item => ({
        value: item.id.toString(),
        label: `${item.schedule.flightNumber}, ${item.schedule.route.departureAirport.iatacode} - ${item.schedule.route.arrivalAirport.iatacode}, ${item.schedule.date}, ${item.schedule.time}`,
    }));
};
