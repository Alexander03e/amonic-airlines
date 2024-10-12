import { CreateUserForm, ChangeUser, ChangeSchedule } from 'Common/components/common';
import { Modal } from 'Common/components/ui';
import { useModalStore } from 'Common/store/app/selectors';
import { ReactElement } from 'react';

export const LayoutModal = (): ReactElement => {
    const { currentModal } = useModalStore();
    return (
        <Modal>
            {currentModal === '#createUser' && <CreateUserForm />}
            {currentModal === '#changeUser' && <ChangeUser />}
            {currentModal === '#changeschedule' && <ChangeSchedule />}
        </Modal>
    );
};
