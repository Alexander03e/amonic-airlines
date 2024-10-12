import { IFlightSchedule } from 'Common/types/flights';

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
