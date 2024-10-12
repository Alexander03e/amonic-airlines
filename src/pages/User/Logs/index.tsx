import { UserLogs } from 'Modules';
import styles from './logs-page.module.scss';
import { Container } from 'Common/components';
import { UserInfo } from 'Src/modules/User/Info';

export const LogsPage = () => {
    return (
        <div className={styles.wrapper}>
            <Container>
                <UserInfo />
                <UserLogs />
            </Container>
        </div>
    );
};
