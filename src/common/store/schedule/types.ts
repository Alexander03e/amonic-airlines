import { IFlightSchedule, IUpdateSchedule } from 'Common/types/flights';

export interface IScheduleStore {
    scheduleFilters: {
        date: string | null;
        flightNumber: string | null;
        sort: string | null;
        from: string | null;
        to: string | null;
    };

    currentSchedule: IFlightSchedule | null;

    shoudUpdate: boolean;

    setCurrentSchedule: (schedule: IFlightSchedule | null) => void;
    setShouldUpdate: (value: boolean) => void;
    updateScheduleFilters: (filters: Partial<IScheduleStore['scheduleFilters']>) => void;
}

export interface IUpdatedItem {
    id: number | 'NEW';
    item: IUpdateSchedule;
}

export interface IUpdatedScheduleStore {
    schedules: IUpdatedItem[];

    setSchedule: (data: IUpdatedItem | null) => void;
    removeSchedule: (id: number) => void;
}
