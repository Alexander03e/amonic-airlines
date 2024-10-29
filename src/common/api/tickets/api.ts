import { AxiosInstance } from 'axios';
import { ITicket, TTicketPayload } from 'Common/types/booking';
import { ICabinType } from 'Common/types/flights';
import { IAmenity } from 'Common/types/tickets';
import { HttpInstanceFactory } from 'Common/utils/HttpInstanceFactory';

interface IAmenitiesCabinType {
    amenities: IAmenity;
    cabinType: ICabinType;
}

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

    async getAmenities(): Promise<IAmenity[]> {
        return (await this._httpInstance.get('/amenities')).data;
    }

    async getTicketsById(id: string): Promise<ITicket[]> {
        return (await this._httpInstance.get(`/tickets/${id}`)).data;
    }

    async getAmenitiesCabinType(): Promise<IAmenitiesCabinType[]> {
        return (await this._httpInstance.get('/amenitiescabintypes')).data;
    }
}
