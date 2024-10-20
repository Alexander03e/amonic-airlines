import { create } from 'zustand';
import { IBookingStore } from './types';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { EBookingStep } from './enums';

export const useBookingStore = create<IBookingStore>()(
    persist(
        devtools(
            immer(set => ({
                outboundFlights: null,
                returnFlights: null,
                step: EBookingStep.SEARCH,
                bookingType: null,
                cabinType: null,
                selectedFlights: {
                    outbound: null,
                    return: null,
                },
                passengers: null,

                clear: () => {
                    set(state => {
                        state.outboundFlights = null;
                        state.returnFlights = null;
                        state.selectedFlights = {
                            outbound: null,
                            return: null,
                        };
                        state.passengers = null;
                        state.step = EBookingStep.SEARCH;
                        state.bookingType = null;
                        state.cabinType = null;
                    });
                },
                removePassenger: id => {
                    set(state => {
                        if (!state.passengers) return;

                        state.passengers = state.passengers?.filter(item => item.id !== id);
                    });
                },
                setPassengers: passenger =>
                    set(state => {
                        if (passenger === null) {
                            state.passengers = [];
                            return;
                        }
                        if (state.passengers && Array.isArray(state.passengers)) {
                            state.passengers.push(passenger);
                        } else {
                            state.passengers = [passenger];
                        }
                    }),
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
                        state.outboundFlights = flights;
                    }),
                setReturnFlights: flights =>
                    set(state => {
                        state.returnFlights = flights;
                    }),
                setStep: step =>
                    set(state => {
                        state.step = step;
                    }),
            })),
        ),
        {
            name: 'booking',
        },
    ),
);
