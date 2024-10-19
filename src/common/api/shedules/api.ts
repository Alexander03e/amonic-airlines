import { AxiosInstance } from 'axios';
import {
    IFlightSchedule,
    ISearchSchedulesPayload,
    TFlightShedulePayload,
} from 'Common/types/flights';
import { HttpInstanceFactory } from 'Common/utils/HttpInstanceFactory';

export class ShedulesApi {
    private static _instance: ShedulesApi | null = null;
    private _httpInstance: AxiosInstance;

    constructor() {
        this._httpInstance = HttpInstanceFactory.getInstance();
    }

    static getInstance() {
        if (this._instance) return this._instance;
        this._instance = new ShedulesApi();

        return this._instance;
    }

    public async getSchedules(): Promise<IFlightSchedule[]> {
        return (await this._httpInstance.get('/schedules')).data;
    }

    public async getSchedulesByFilters(data: ISearchSchedulesPayload): Promise<IFlightSchedule[]> {
        return (await this._httpInstance.post('/schedules/search', { ...data })).data;
    }

    public async getScheduleById(id: number): Promise<IFlightSchedule> {
        return (await this._httpInstance.get(`/schedules/${id}`)).data;
    }

    public async createSchedule(schedule: TFlightShedulePayload): Promise<IFlightSchedule> {
        return (await this._httpInstance.post('/schedules', schedule)).data;
    }

    public async updateSchedule(schedule: Partial<IFlightSchedule>): Promise<IFlightSchedule> {
        return (await this._httpInstance.put(`/schedules`, schedule)).data;
    }

    public async deleteSchedule(id: number): Promise<void> {
        await this._httpInstance.delete(`/schedules/${id}`);
    }
}
