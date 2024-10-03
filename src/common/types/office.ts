/**
 * Тип страны.
 * @prop {number} id - Идентификатор страны.
 * @prop {string} name - Название страны.
 */
type TCountry = {
    id: number;
    name: string;
};

/**
 * Интерфейс офиса.
 * @prop {number} id - Идентификатор офиса.
 * @prop {TCountry} [country] - Страна офиса.
 * @prop {string} title - Название офиса.
 * @prop {string} [phone] - Телефон офиса.
 * @prop {string} [contact] - Контактное лицо.
 */
interface IOffice {
    id: number;
    country?: TCountry;
    title: string;
    phone?: string;
    contact?: string;
}

export type { IOffice, TCountry };
