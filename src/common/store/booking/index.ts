import { create } from 'zustand';
import { IBookingStore } from './types';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { EBookingStep } from './enums';

export const useBookingStore = create<IBookingStore>()(
    devtools(
        immer(set => ({
            outboundFlights: [],
            returnFlights: [],
            step: EBookingStep.SEARCH,
            bookingType: null,
            cabinType: null,
            selectedFlights: {
                outbound: null,
                return: null,
            },

            setSelectedOutbound: flight =>
                set(state => {
                    state.selectedFlights.outbound = flight;
                }),
            setSelectedReturn: flight =>
                set(state => {
                    state.selectedFlights.return = flight;
                }),
            setCabinType: type =>
                set(state => {
                    state.cabinType = type;
                }),

            setBookingType: type =>
                set(state => {
                    state.bookingType = type;
                }),

            setOutboundFlights: flights =>
                set(state => {
                    if (flights === null) {
                        state.outboundFlights = [];
                        return;
                    }

                    state.outboundFlights = flights;
                }),
            setReturnFlights: flights =>
                set(state => {
                    if (flights === null) {
                        state.returnFlights = [];
                        return;
                    }

                    state.returnFlights = flights;
                }),
            setStep: step =>
                set(state => {
                    state.step = step;
                }),
        })),
    ),
);
