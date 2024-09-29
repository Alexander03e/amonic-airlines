import { AxiosInstance } from "axios";
import { HttpInstanceFactory } from "../utils/HttpInstanceFactory";

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
}
