import { IOffice } from './office';
import { IRole } from './role';

/**
 * Интерфейс пользователя.
 * @prop {number} id - Идентификатор пользователя.
 * @prop {string} firstName - Имя пользователя.
 * @prop {string} lastName - Фамилия пользователя.
 * @prop {string} email - Электронная почта пользователя.
 * @prop {IOffice} office - Офис пользователя.
 * @prop {string} birthdate - Дата рождения пользователя.
 * @prop {IRole} role - Роль пользователя.
 * @prop {boolean | null} [active] - Активность пользователя.
 */
interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    office: IOffice;
    birthdate: string;
    role: IRole;
    active?: boolean | null;
}

/**
 * Тип данных для регистрации пользователя.
 */
type TUserRegPayload = Omit<IUser, 'id' | 'role' | 'office'> & {
    password: string;
    role: number;
    office: number;
};

/**
 * Тип данных для аутентификации пользователя.
 */
type TUserAuthPayload = Pick<IUser, 'email'> & {
    password: string;
};

type TUserUpdatePayload = Omit<IUser, 'role' | 'office'> & {
    office: number;
    role: number;
};

export type { IUser, TUserRegPayload, TUserAuthPayload, TUserUpdatePayload };
