import { IFlightSchedule, TCabinType } from 'Common/types/flights';
import { EBookingStep } from './enums';
import { EBookingSearchType } from 'Common/components/common/forms/BookingSearch/enums';

export interface IBookingStore {
    step: EBookingStep;
    outboundFlights: IFlightSchedule[] | [];
    returnFlights: IFlightSchedule[] | [];
    bookingType: EBookingSearchType | null;
    cabinType: TCabinType | null;
    selectedFlights: {
        outbound: IFlightSchedule | null;
        return: IFlightSchedule | null;
    };

    setSelectedOutbound: (flight: IFlightSchedule | null) => void;
    setSelectedReturn: (flight: IFlightSchedule | null) => void;
    setCabinType: (type: TCabinType | null) => void;
    setBookingType: (type: EBookingSearchType | null) => void;
    setOutboundFlights: (flights: IFlightSchedule[] | null) => void;
    setReturnFlights: (flights: IFlightSchedule[] | null) => void;
    setStep: (step: EBookingStep) => void;
}
