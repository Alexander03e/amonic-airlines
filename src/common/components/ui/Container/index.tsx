import { ReactElement, ReactNode } from 'react';
import styles from './container.module.scss';
import cn from 'classnames';

interface IProps {
    children?: ReactNode;
    className?: string;
}

export const Container = ({ children, className }: IProps): ReactElement => {
    return <div className={cn(styles.wrapper, className)}>{children}</div>;
};
