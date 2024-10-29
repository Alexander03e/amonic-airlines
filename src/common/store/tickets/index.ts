import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { ITicketsStore } from './types';

export const useTicketStore = create<ITicketsStore>()(
    devtools(
        immer(set => ({
            bookingReference: null,
            currentTicket: null,

            clear: () =>
                set(state => {
                    state.bookingReference = null;
                    state.currentTicket = null;
                }),
            setBookingReference: bookingReference =>
                set(state => {
                    state.bookingReference = bookingReference;
                }),
            setCurrentTickets: ticket =>
                set(state => {
                    state.currentTicket = ticket;
                }),
        })),
    ),
);
