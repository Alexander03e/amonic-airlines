import { MouseEvent, ReactElement, ReactNode } from 'react';
import styles from './icon.module.scss';
import cn from 'classnames';

interface IProps {
    icon?: ReactNode;
    size?: 'small' | 'medium' | 'large';
    withBorder?: boolean;
    onClick?: (e: MouseEvent) => void;
    className?: string;
}

export const Icon = ({
    icon,
    size = 'medium',
    className,
    onClick,
    withBorder,
}: IProps): ReactElement => {
    const classNames = cn(styles.icon, styles[size], className, {
        [styles.withBorder]: withBorder,
        [styles.clickable]: onClick,
    });

    const handleClose = (e: MouseEvent) => {
        if (!onClick) return;

        onClick(e);
    };

    if (onClick) {
        return (
            <button onClick={handleClose} className={classNames}>
                {icon}
            </button>
        );
    }

    return <div className={classNames}>{icon}</div>;
};
