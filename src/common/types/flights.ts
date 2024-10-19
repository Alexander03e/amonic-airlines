import { TCountry } from './office';

/**
 * Интерфейс самолета.
 * @prop {number} id - идентификатор самолета.
 * @prop {string} name - название самолета.
 * @prop {string} makeModel - модель самолета.
 * @prop {number} totalSeats - общее количество мест.
 * @prop {number} businessSeats - количество мест бизнес-класса.
 * @prop {number} economySeats - количество мест эконом-класса.
 */
export interface IAircraft {
    id: number;
    name: string;
    makeModel: string;
    totalSeats: number;
    businessSeats: number;
    economySeats: number;
}

/**
 * Интерфейс аэропорта.
 * @prop {number} id - идентификатор аэропорта.
 * @prop {TCountry} country - страна, в которой находится аэропорт.
 * @prop {string} name - название аэропорта.
 * @prop {string} iatacode - IATA-код аэропорта.
 */
export interface IAirport {
    id: number;
    country: TCountry;
    name: string;
    iatacode: string;
}

/**
 * Интерфейс маршрута.
 * @prop {number} id - идентификатор маршрута.
 * @prop {IAirport} departureAirport - аэропорт отправления.
 * @prop {IAirport} arrivalAirport - аэропорт прибытия.
 * @prop {number} distance - расстояние между аэропортами.
 */
export interface IRoute {
    id: number;
    departureAirport: IAirport;
    arrivalAirport: IAirport;
    distance: number;
    flightTime: number;
}

/**
 * Интерфейс расписания рейса.
 * @prop {number} id - идентификатор рейса.
 * @prop {string} date - дата вылета.
 * @prop {string} time - время вылета.
 * @prop {IAircraft} aircraft - информация об аэропорте.
 * @prop {IRoute} route - информация о маршруте.
 * @prop {string} flightNumber - номер рейса.
 * @prop {number} economyPrice - стоимость билета.
 * @prop {boolean} confirmed - подтвержден ли рейс.
 */
export interface IFlightSchedule {
    id: number;
    date: string;
    time: string;
    aircraft: IAircraft;
    route: IRoute;
    flightNumber: string;
    economyPrice: number;
    confirmed: boolean;
}

export type TUpdateAction = 'ADD' | 'EDIT';

/**
 * Интерфейс для обновления расписания рейса.
 * @prop {TUpdateAction} action - действие.
 * @prop {number} aircraft - идентификатор самолета.
 * @prop {string} departureAirport - IATA-код аэропорта отправления.
 * @prop {string} arrivalAirport - IATA-код аэропорта прибытия.
 */
export interface IUpdateSchedule extends Omit<IFlightSchedule, 'aircraft' | 'route' | 'id'> {
    action: TUpdateAction;
    aircraft: number;
    departureAirport: string;
    arrivalAirport: string;
}

export type TCabinType = 'Economy' | 'Business' | 'First Class';

/**
 * Интерфейс для типа билетов.
 * @prop {number} id - идентификатор типа билета.
 * @prop {TCabinType} name - название типа билета.
 */
export interface ICabinType {
    id: number;
    name: TCabinType;
}

/**
 * Интерфейс для поиска расписания рейсов.
 * @prop {string} date - дата вылета.
 * @prop {string} departureAirport - IATA-код аэропорта отправления.
 * @prop {string} arrivalAirport - IATA-код аэропорта прибытия.
 */
export interface ISearchSchedulesPayload {
    date: string;
    departureAirport: string;
    arrivalAirport: string;
}

export type TFlightShedulePayload = Omit<IFlightSchedule, 'id'>;
