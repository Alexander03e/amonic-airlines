import { AxiosInstance } from 'axios';
import {
    IUser,
    TUserAuthPayload,
    TUserAuthResponse,
    TUserRegPayload,
    TUserUpdatePayload,
} from 'Common/types/user';
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
        return (await this._httpInstance.post('/users', { ...data })).data;
    }

    async getUsers(): Promise<IUser[]> {
        return (await this._httpInstance.get('/users')).data;
    }

    async authUser(data: TUserAuthPayload): Promise<TUserAuthResponse> {
        return (await this._httpInstance.post('/users/verify', { ...data })).data;
    }

    async updateUser(data: Partial<TUserUpdatePayload>): Promise<IUser> {
        return (await this._httpInstance.put(`/users`, { ...data })).data;
    }

    async getUserById(id: number): Promise<IUser> {
        return (await this._httpInstance.get(`/users/${id}`)).data;
    }

    async deleteUser(id: number): Promise<IUser> {
        return (await this._httpInstance.delete(`/users/${id}`)).data;
    }
}
