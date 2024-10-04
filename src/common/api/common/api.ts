import { AxiosInstance } from 'axios';
import { IOffice } from 'Common/types/office';
import { HttpInstanceFactory } from 'Common/utils/HttpInstanceFactory';

export class CommonApi {
    private static _instance: CommonApi | null = null;
    private _httpInstance: AxiosInstance;

    constructor() {
        this._httpInstance = HttpInstanceFactory.getInstance();
    }

    static getInstance() {
        if (this._instance) return this._instance;
        this._instance = new CommonApi();

        return this._instance;
    }

    public async getOffices(): Promise<IOffice[]> {
        return (await this._httpInstance.get('/office')).data;
    }
}
