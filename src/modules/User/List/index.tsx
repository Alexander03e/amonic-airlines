import { ReactElement, useState } from 'react';
import styles from './list.module.scss';
import { IUser } from 'Common/types/user';
import map from 'lodash/map';
import { Row } from './components/Row';
import { Button } from 'Common/components';
import { TABLE_ROW, TITLE } from './consts';
import { useAppStore } from 'Common/store/app';
import { Slide } from 'Common/components/ui/Animation';

interface IProps {
    users: IUser[];
}

export const List = ({ users }: IProps): ReactElement => {
    const { setCurrentModal, setModalData } = useAppStore();

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const handleSelect = (id: number) => {
        if (id === selectedUserId) {
            setSelectedUserId(null);
            return;
        }
        setSelectedUserId(id);
    };

    const selectedUser = users?.find(item => item.id === selectedUserId);

    const getToggleTitle = () => {
        if (!selectedUser?.active) return TITLE.ENABLE;

        return TITLE.DISABLE;
    };

    const toggleTitle = getToggleTitle();

    const handleChange = () => {
        if (!selectedUser) return;

        setModalData(selectedUser);
        setCurrentModal('#changeUser');
    };

    return (
        <div className={styles.wrapper}>
            <Row {...TABLE_ROW} disabled />
            <div className={styles.list}>
                {map(users, user => {
                    return (
                        <Row
                            onSelect={handleSelect}
                            isSelected={selectedUser?.id === user.id}
                            key={user.id}
                            office={user.office.title}
                            role={user.role.title}
                            active={user?.active as boolean}
                            birthdate={user.birthdate}
                            email={user.email}
                            firstName={user.firstName}
                            id={user.id}
                            lastName={user.lastName}
                        />
                    );
                })}
            </div>

            <Slide className={styles.buttons} isOpen={Boolean(selectedUser)}>
                <Button label={toggleTitle} />
                <Button onClick={handleChange} label={TITLE.CHANGE} />
            </Slide>
        </div>
    );
};
