import { ReactElement } from 'react';
import styles from './page.module.scss';
import { Outlet } from 'react-router-dom';
import { LayoutModal } from 'Common/components';

export const Page = (): ReactElement => {
    return (
        <>
            <main className={styles.main}>
                <Outlet />
            </main>
            <LayoutModal />
        </>
    );
};
