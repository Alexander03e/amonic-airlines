import { queryOptions } from '@tanstack/react-query';
import { KEYS } from 'Common/types/api';
import { UserApi } from './api';

export class UserQueryOptions {
    private static _instance: UserQueryOptions | null = null;
    private _api: UserApi;

    constructor() {
        this._api = UserApi.getInstance();
    }

    public static getInstance() {
        if (this._instance) return this._instance;

        this._instance = new UserQueryOptions();
        return this._instance;
    }

    public getUsers() {
        return queryOptions({
            queryKey: [KEYS.USER],
            queryFn: this._api.getUsers,
        });
    }
}
