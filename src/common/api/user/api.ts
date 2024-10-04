import { AxiosInstance } from 'axios';
import { IUser, TUserRegPayload } from 'Common/types/user';
import { HttpInstanceFactory } from 'Common/utils/HttpInstanceFactory';

export class UserApi {
    private static _instance: UserApi | null = null;
    private _httpInstance: AxiosInstance;

    constructor() {
        this._httpInstance = HttpInstanceFactory.getInstance();
    }

    static getInstance() {
        if (this._instance) return this._instance;
        this._instance = new UserApi();

        return this._instance;
    }

    async addUser(data: TUserRegPayload): Promise<IUser> {
        return (await this._httpInstance.post('/user', { ...data })).data;
    }

    async getUsers(): Promise<IUser[]> {
        return (await this._httpInstance.get('/users')).data;
    }
}
