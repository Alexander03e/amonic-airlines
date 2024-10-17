import { ReactElement, useState } from 'react';
import styles from './list.module.scss';
import map from 'lodash/map';
import { Button, Error, Loader } from 'Common/components';
import { HEADER, TITLE } from './consts';
import { useAppStore } from 'Common/store/app';
import { Slide } from 'Common/components/ui/Animation';
import { useUnblockUser, useUsers } from 'Common/api/user/hooks';
import AddUserIcon from 'Assets/icons/add_user.svg?react';
import PenIcon from 'Assets/icons/pen.svg?react';
import { Table } from 'Common/components/ui/Table';
import { toast } from 'react-toastify';

export const List = (): ReactElement => {
    const { setCurrentModal, setModalData } = useAppStore();

    const { data, isError, isLoading } = useUsers();

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const { mutateAsync: unblockUser, isPending } = useUnblockUser();

    const handleSelect = (id: unknown) => {
        if (id === selectedUserId) {
            setSelectedUserId(null);
            return;
        }
        setSelectedUserId(id as number);
    };

    const handleCreateUser = () => {
        setCurrentModal('#createUser');
    };

    const selectedUser = data?.find(item => item.id === selectedUserId);

    const getToggleTitle = () => {
        if (selectedUser?.userBlocking) return TITLE.ENABLE;

        return TITLE.DISABLE;
    };

    const toggleUnlockVariant = !selectedUser?.userBlocking ? 'danger' : 'success';
    const toggleTitle = getToggleTitle();

    const handleChange = () => {
        if (!selectedUser) return;

        setModalData(selectedUser);
        setCurrentModal('#changeUser');
    };

    const handleToggleUnlock = async () => {
        if (selectedUser?.userBlocking) {
            await unblockUser(selectedUser.userBlocking.id);
            toast('Пользователь разблокирован');
            return;
        }

        setModalData(selectedUser);
        setCurrentModal('#blockUser');

        // return;
        // if (!selectedUser?.active) {
        //     updateUser({ active: true, id: selectedUser?.id });
        //     return;
        // }
        // updateUser({ active: false, id: selectedUser.id });
    };

    const userOptions = map(data, user => {
        return {
            id: user.id,
            isError: Boolean(user?.userBlocking),
            data: [
                user.id,
                user.firstName,
                user.lastName,
                user.email,
                user.birthdate,
                user.role.title,
                user.office.title,
                user.active ? 'Онлайн' : 'Оффлайн',
            ],
        };
    });

    if (isError) return <Error />;

    if (isLoading) return <Loader />;

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <Button icon={<AddUserIcon />} onClick={handleCreateUser} label={TITLE.CREATE} />
                <Slide className={styles.buttons} isOpen={Boolean(selectedUser)}>
                    <Button
                        onClick={handleToggleUnlock}
                        variant={toggleUnlockVariant}
                        label={toggleTitle}
                        isLoading={isPending}
                    />
                    <Button icon={<PenIcon />} onClick={handleChange} label={TITLE.CHANGE} />
                    {selectedUser?.userBlocking && (
                        <span>
                            Причина бана: {selectedUser.userBlocking.blockingReason || 'Не указана'}
                        </span>
                    )}
                </Slide>
            </div>
            <div className={styles.list}>
                <Table
                    rows={userOptions}
                    header={HEADER}
                    activeRowId={selectedUserId}
                    rowOnClick={handleSelect}
                />
            </div>
        </div>
    );
};
