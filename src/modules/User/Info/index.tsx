import styles from './user-info.module.scss';
import { useUserStore } from 'Common/store/user';

export const UserInfo = () => {
    const { user } = useUserStore();

    const formattedWelcome = `Привет, ${user?.firstName}, добро пожаловать в Amonic Airlines`;

    return (
        <div className={styles.wrapper}>
            <p>{formattedWelcome}</p>
            <div className={styles.info}>
                <p>Общее время в системе</p>
            </div>
        </div>
    );
};
