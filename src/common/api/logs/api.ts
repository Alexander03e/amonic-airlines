import { AxiosInstance } from 'axios';
import { IUserLogPayload, IUserLogs, IUserLogsDataResponse } from 'Common/types/user';
import { HttpInstanceFactory } from 'Common/utils/HttpInstanceFactory';

export class LogsApi {
    private static _instance: LogsApi | null = null;
    private _httpInstance: AxiosInstance;

    constructor() {
        this._httpInstance = HttpInstanceFactory.getInstance();
    }

    static getInstance() {
        if (this._instance) return this._instance;
        this._instance = new LogsApi();

        return this._instance;
    }

    async getUserLogs(id: number): Promise<IUserLogsDataResponse> {
        return (await this._httpInstance.get(`/userslogs/${id}`)).data;
    }

    async addUserLogs(data: Partial<IUserLogPayload>): Promise<IUserLogs> {
        return await this._httpInstance.post(`/userslogs`, { ...data });
    }

    async getAllUserLogs(): Promise<IUserLogs[]> {
        return (await this._httpInstance.get(`/userslogs`)).data;
    }

    async updateUserLogs(data: IUserLogPayload): Promise<IUserLogs> {
        return await this._httpInstance.put(`/userslogs`, { ...data });
    }

    async removeUserLogs(id: number) {
        return await this._httpInstance.delete(`/userslogs/${id}`);
    }
}
