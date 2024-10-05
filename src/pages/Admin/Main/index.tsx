import { Container } from 'Common/components';
import styles from './main-page.module.scss';
import { List } from 'Modules';

export const MainPage = () => {
    return (
        <div className={styles.wrapper}>
            <Container>
                <List />
            </Container>
        </div>
    );
};
