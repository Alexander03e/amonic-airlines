import { ReactElement } from 'react';
import { ILeftSideBarItem } from '../../types';
import cn from 'classnames';
import styles from './side-menu-item.module.scss';

interface IProps extends ILeftSideBarItem {
    onClick?: () => void;
    isActive?: boolean;
    isOpen?: boolean;
    className?: string;
}

export const SideMenuItem = ({
    className,
    icon,
    isActive,
    isOpen,
    label,
    onClick,
}: IProps): ReactElement => {
    return (
        <button
            onClick={onClick}
            className={cn(styles.wrapper, className, {
                [styles.active]: isActive,
                [styles.open]: isOpen,
            })}
        >
            {icon}
            {isOpen && <span className={styles.label}>{label}</span>}
        </button>
    );
};
