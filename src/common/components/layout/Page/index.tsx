import { ReactElement } from 'react';
import styles from './page.module.scss';
import { Outlet } from 'react-router-dom';
import { LayoutModal } from 'Common/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Page = (): ReactElement => {
    return (
        <>
            <main className={styles.main}>
                <Outlet />
            </main>
            <LayoutModal />
            <ToastContainer
                position='bottom-right'
                autoClose={2500}
                className={styles.toast}
                hideProgressBar
            />
        </>
    );
};
