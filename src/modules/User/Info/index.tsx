import { getTimeFromISOString } from 'Common/utils/getTime';
import styles from './user-info.module.scss';
import { useUserStore } from 'Common/store/user';

export const UserInfo = () => {
    const { user, timeSpent } = useUserStore();

    const formattedWelcome = `Привет, ${user?.firstName}, добро пожаловать в Amonic Airlines`;

    const time = getTimeFromISOString(timeSpent ?? '');

    return (
        <div className={styles.wrapper}>
            <p>{formattedWelcome}</p>
            <div className={styles.info}>
                <p>Общее время в системе: {time}</p>
            </div>
        </div>
    );
};
