import { queryOptions } from '@tanstack/react-query';
import { KEYS } from 'Common/types/api';
import { CommonApi } from './api';

export class CommonQueryOptions {
    private static _instance: CommonQueryOptions | null = null;
    private _api: CommonApi;

    constructor() {
        this._api = CommonApi.getInstance();
    }

    public static getInstance() {
        if (this._instance) return this._instance;

        this._instance = new CommonQueryOptions();
        return this._instance;
    }

    public getOffices() {
        return queryOptions({
            queryKey: [KEYS.OFFICES],
            queryFn: this._api.getOffices,
        });
    }
}
