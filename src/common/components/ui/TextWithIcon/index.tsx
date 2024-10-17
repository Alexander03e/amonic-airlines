import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import styles from './text-with-icon.module.scss';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    icon?: ReactNode;
    label?: string;
}

export const TextWithIcon = ({ label, icon, ...props }: IProps): ReactElement => {
    return (
        <div className={styles.wrapper} {...props}>
            {icon}
            {label && <span>{label}</span>}
        </div>
    );
};
