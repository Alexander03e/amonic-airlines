import { IOffice } from './office';
import { IRole } from './role';

/**
 * Интерфейс логов пользователя.
 * @prop {IUser} user - объект пользователя.
 * @prop {string} logInTime - время захода (ISO).
 * @prop {string} [logOutTime] - время выхода (ISO).
 * @prop {string | null} [crashReason] - причина сбоя.
 * @prop {boolean | null} [softwareCrash] - сбой софта.
 * @prop {boolean | null} [systemCrash] - системный сбой.
 */
interface IUserLogs {
    id?: number;
    user: IUser;
    logInTime: string;
    logOutTime?: string;
    crashReason?: string | null;
    softwareCrash?: boolean | null;
    systemCrash?: boolean | null;
}

/**
 * Интерфейс данных логов пользователя.
 * @prop {number} user - Идентификатор пользователя.
 */
interface IUserLogPayload extends Omit<IUserLogs, 'user'> {
    user: number;
}

/**
 * Интерфейс ответа на добавление логов пользователя.
 * @prop {IUserLogs[]} usersLogs - Логи юзера.
 * @prop {string} timeSpend - Проведенное время юзера.
 */
interface IUserLogsDataResponse {
    usersLogs: IUserLogs[];
    timeSpend: string;
}

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

type TUserAuthResponse = {
    user: IUser;
    status: 'INCORRECT PASSWORD' | 'ACCESS ACCEPT' | null | 400;
};

export type {
    IUser,
    TUserRegPayload,
    TUserAuthPayload,
    TUserUpdatePayload,
    TUserAuthResponse,
    IUserLogs,
    IUserLogsDataResponse,
    IUserLogPayload,
};
