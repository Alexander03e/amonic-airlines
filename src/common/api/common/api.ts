import { AxiosInstance } from 'axios';
import { IOffice } from 'Common/types/office';
import { IRole } from 'Common/types/role';
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
        return (await this._httpInstance.get('/offices')).data;
    }

    public async getRoles(): Promise<IRole[]> {
        return (await this._httpInstance.get('/roles')).data;
    }
}
