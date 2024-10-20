import { ICabinType, IFlightSchedule } from './flights';
import { TCountry } from './office';
import { IUser } from './user';

export interface IPassenger {
    firstName: string;
    lastName: string;
    birthdate: string;
    passport: string;
    passportCountry: string;
    phone: string;
}

export interface ITicket {
    id: number;
    user: IUser;
    schedule: IFlightSchedule;
    cabinType: ICabinType;
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string;
    passportNumber: string;
    country: TCountry;
    bookingReference: string;
    confirmed: boolean;
}

export type TTicketPayload = Omit<ITicket, 'id' | 'user' | 'cabinType' | 'country' | 'schedule'> & {
    user: string;
    cabinType: string;
    country: string;
    schedule: string;
};
