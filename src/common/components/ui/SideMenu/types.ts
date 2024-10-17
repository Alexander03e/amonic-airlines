import type { ReactNode } from 'react';

type TItemValue = number | string;

/**
 * Интерфейс LeftSidebarItem.
 * @prop {TItemValue} value - значение элемента.
 * @prop {string} [label] - лэйбл элемента.
 * @prop {ReactNode | null} [icon] - иконка элемента.
 */
interface ILeftSideBarItem {
    value: TItemValue;
    label?: string;
    icon?: ReactNode | null;
}

export type { ILeftSideBarItem, TItemValue };
