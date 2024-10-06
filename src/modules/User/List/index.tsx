import { ReactElement, useState } from 'react';
import styles from './list.module.scss';
import map from 'lodash/map';
import { Row } from './components/Row';
import { Button, Error, Loader } from 'Common/components';
import { TABLE_ROW, TITLE } from './consts';
import { useAppStore } from 'Common/store/app';
import { Slide } from 'Common/components/ui/Animation';
import { useUpdateUser, useUsers } from 'Common/api/user/hooks';

export const List = (): ReactElement => {
    const { setCurrentModal, setModalData } = useAppStore();

    const { data, isError, isLoading } = useUsers();

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const { mutate: updateUser } = useUpdateUser();

    const handleSelect = (id: number) => {
        if (id === selectedUserId) {
            setSelectedUserId(null);
            return;
        }
        setSelectedUserId(id);
    };

    const handleCreateUser = () => {
        setCurrentModal('#createUser');
    };

    const selectedUser = data?.find(item => item.id === selectedUserId);

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

    const handleToggleUnlock = () => {
        if (!selectedUser?.active) {
            updateUser({ active: true, id: selectedUser?.id });
            return;
        }
        updateUser({ active: false, id: selectedUser.id });
    };

    if (isError) return <Error />;

    if (isLoading) return <Loader />;

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <Button onClick={handleCreateUser} label={TITLE.CREATE} />
                <Slide className={styles.buttons} isOpen={Boolean(selectedUser)}>
                    <Button onClick={handleToggleUnlock} label={toggleTitle} />
                    <Button onClick={handleChange} label={TITLE.CHANGE} />
                </Slide>
            </div>
            <Row className={styles.firstRow} {...TABLE_ROW} disabled />
            <div className={styles.list}>
                {map(data, user => {
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
        </div>
    );
};
