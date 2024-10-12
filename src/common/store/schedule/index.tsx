import { create } from 'zustand';
import { IScheduleStore, IUpdatedScheduleStore } from './types';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
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

export const useUpdatedScheduleStore = create<IUpdatedScheduleStore>()(
    persist(
        immer(set => ({
            schedules: [],

            removeSchedule: id =>
                set(state => {
                    state.schedules = state.schedules.filter(schedule => schedule.id != id);
                }),
            setSchedule: data =>
                set(state => {
                    if (data === null) {
                        state.schedules = [];

                        return;
                    }
                    const { id, item } = data;

                    if (id === 'NEW') {
                        state.schedules.push({ id: 'NEW', item });

                        return;
                    }
                    const index = state.schedules.findIndex(schedule => schedule.id === id);

                    if (index === -1) {
                        state.schedules.push({ id, item });
                    } else {
                        state.schedules[index].item = item;
                    }
                }),
        })),
        {
            name: 'updatedSchedule',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
