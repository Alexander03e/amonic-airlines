import { ICabinType, IFlightSchedule, IScheduleRoute } from 'Common/types/flights';
import { EBookingStep } from './enums';
import { EBookingSearchType } from 'Common/components/common/forms/BookingSearch/enums';
import { IPassenger } from 'Common/types/booking';
import { TScheduleRoutes } from '../../types/flights';

export type IStorePassenger = IPassenger & {
    id: unknown;
};

export type IFlightScheduleWithTransfer = IFlightSchedule & {
    transfer?: number;
};

export type IFlightScheduleWithCabin = IScheduleRoute & {
    cabinType?: ICabinType | null;
};

export interface IBookingStore {
    step: EBookingStep;
    outboundFlights: TScheduleRoutes | null;
    returnFlights: TScheduleRoutes | null;
    bookingType: EBookingSearchType | null;
    cabinType: ICabinType | null;
    selectedFlights: {
        outbound: IFlightScheduleWithCabin | null;
        return: IFlightScheduleWithCabin | null;
    };
    passengers: IStorePassenger[] | null;

    clear: () => void;
    removePassenger: (id: unknown) => void;
    setPassengers: (passengers: IStorePassenger | null) => void;
    setSelectedOutbound: (flight: IFlightScheduleWithCabin | null) => void;
    setSelectedReturn: (flight: IFlightScheduleWithCabin | null) => void;
    setCabinType: (type: ICabinType | null) => void;
    setBookingType: (type: EBookingSearchType | null) => void;
    setOutboundFlights: (flights: TScheduleRoutes | null) => void;
    setReturnFlights: (flights: TScheduleRoutes | null) => void;
    setStep: (step: EBookingStep) => void;
}
