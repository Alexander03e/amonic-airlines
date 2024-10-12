import { AxiosInstance } from 'axios';
import { IAirport } from 'Common/types/flights';
import { HttpInstanceFactory } from 'Common/utils/HttpInstanceFactory';

export class AirportsApi {
    private static _instance: AirportsApi | null = null;
    private _httpInstance: AxiosInstance;

    constructor() {
        this._httpInstance = HttpInstanceFactory.getInstance();
    }

    static getInstance() {
        if (this._instance) return this._instance;
        this._instance = new AirportsApi();

        return this._instance;
    }

    public async getAirports(): Promise<IAirport[]> {
        return (await this._httpInstance.get('/airports')).data;
    }

    public async getAirportById(id: number): Promise<IAirport> {
        return (await this._httpInstance.get(`/airports/${id}`)).data;
    }
}
