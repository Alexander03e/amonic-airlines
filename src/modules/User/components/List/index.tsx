import { ReactElement, useState } from 'react';
import styles from './list.module.scss';
import { IUser } from 'Common/types/user';
import map from 'lodash/map';
import { Row } from './components/Row';
import { Button } from 'Common/components';
import { TABLE_ROW, TITLE } from './consts';

interface IProps {
    users: IUser[];
}

export const List = ({ users }: IProps): ReactElement => {
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
                            email={user.birthdate}
                            firstName={user.firstName}
                            id={user.id}
                            lastName={user.lastName}
                        />
                    );
                })}
            </div>

            <div className={styles.buttons}>
                {selectedUser && (
                    <>
                        <Button label={toggleTitle} />
                        <Button label={TITLE.CHANGE} />
                    </>
                )}
            </div>
        </div>
    );
};
