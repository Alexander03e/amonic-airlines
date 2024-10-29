import { ITicket } from 'Common/types/booking';

export interface ITicketsStore {
    bookingReference: string | null;
    currentTicket: ITicket | null;

    clear: () => void;
    setBookingReference: (bookingReference: string | null) => void;
    setCurrentTickets: (tickets: ITicket | null) => void;
}
