type TUserRole = 'User' | 'Administrator';

/**
 * Интерфейс роли.
 * @prop {number} id - Идентификатор роли.
 * @prop {TUserRole} title - Название роли.
 */
interface IRole {
    id: number;
    title: TUserRole;
}

export type { IRole, TUserRole };
