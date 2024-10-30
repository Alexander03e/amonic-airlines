import { IAirport, TCabinType } from "./flights";

//Интерфейс опроса который приходит с сервера
export interface ISurvey {
    id: number;
    month: number;
    year: number;
    departureAirport: IAirport;
    arrivalAirport: IAirport;
    age: number;
    gender: boolean;
    cabinType:TCabinType;
    q1: number;
    q2: number;
    q3: number;
    q4: number;
}

//Интерфейс для получения краткого отчета
export interface IGetReport {
    year: number;
    month: number;
}

export interface IShortReport {
    male: number;
    female: number;
    "18-24": number;
    "25-39": number;
    "40-59": number;
    "60+": number;
    Economy: number;
    Business: number;
    First: number;
    AUH: number;
    BAH: number;
    DOH: number;
    RYU: number;
    CAI: number;
}

//Интерфейс для отдельного показателя из отчета
interface ParamItem {
    id: number;
    name: string;
}

type TFullReport = ParamItem[][][];

//Тип опроса, который отправляем на сервер

type TSurveyRegPayload = Omit<ISurvey, 'id'>

export type { TSurveyRegPayload, TFullReport };