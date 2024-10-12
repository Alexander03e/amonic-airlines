import { create } from 'zustand';
import { IScheduleStore } from './types';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useScheduleStore = create<IScheduleStore>()(
    devtools(
        immer(set => ({
            scheduleFilters: {
                date: null,
                flightNumber: null,
                sort: null,
                from: null,
                to: null,
            },
            shoudUpdate: false,
            currentSchedule: null,

            setCurrentSchedule: schedule =>
                set(state => {
                    state.currentSchedule = schedule;
                }),
            setShouldUpdate: value =>
                set(state => {
                    state.shoudUpdate = value;
                }),
            updateScheduleFilters: filters =>
                set(state => {
                    state.scheduleFilters = {
                        ...state.scheduleFilters,
                        ...filters,
                    };
                }),
        })),
    ),
);
