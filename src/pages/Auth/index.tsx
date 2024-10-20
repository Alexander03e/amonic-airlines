import { Button, SignInForm } from 'Common/components';
import styles from './auth.module.scss';
import { ImageBlock } from 'Common/components';
import LogoPng from 'Assets/images/logo_large.png';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from 'Src/routes/config';

export const AuthPage = () => {
    const navigate = useNavigate();

    const onTickets = () => {
        navigate(ROUTE_PATHS.TICKETS.INDEX);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.top}>
                    <ImageBlock src={LogoPng} alt='logo' />
                </div>
                <SignInForm />
                <Button
                    onClick={onTickets}
                    className={styles.tickets}
                    variant='empty'
                    label='Найти билеты'
                />
            </div>
        </div>
    );
};
