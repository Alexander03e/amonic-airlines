import { ReactElement } from 'react';
import styles from './page.module.scss';
import { Outlet } from 'react-router-dom';

export const Page = (): ReactElement => {
    return (
        <main className={styles.main}>
            <Outlet />
        </main>
    );
};
