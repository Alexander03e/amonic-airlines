import { AxiosInstance } from 'axios';
import { ITicket, TTicketPayload } from 'Common/types/booking';
import { HttpInstanceFactory } from 'Common/utils/HttpInstanceFactory';

export class TicketsApi {
    private static _instance: TicketsApi | null = null;
    private _httpInstance: AxiosInstance;

    constructor() {
        this._httpInstance = HttpInstanceFactory.getInstance();
    }

    static getInstance() {
        if (this._instance) return this._instance;
        this._instance = new TicketsApi();

        return this._instance;
    }

    async newTicket(data: TTicketPayload): Promise<ITicket> {
        return (await this._httpInstance.post('/tickets', data)).data;
    }
}
