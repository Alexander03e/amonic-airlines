import { Button, Container } from 'Common/components';
import styles from './main-page.module.scss';
import { LABELS } from './consts';
import { useModalStore } from 'Common/store/app/selectors';
import { List } from 'Modules';
import { mockList } from './mocks';

export const MainPage = () => {
    const { setCurrentModal } = useModalStore();

    const handleCreateUser = () => {
        setCurrentModal('#createUser');
    };

    return (
        <div className={styles.wrapper}>
            <Container>
                <Button onClick={handleCreateUser} label={LABELS.CREATE_USER} />
                <List users={mockList} />
            </Container>
        </div>
    );
};
