import { ReactElement, ReactNode } from 'react';
import styles from './page.module.scss';

interface IProps {
    children: ReactNode;
}

export const Page = ({ children }: IProps): ReactElement => {
    return <main className={styles.main}>{children}</main>;
};
