import { CreateUserForm } from 'Common/components/common';
import { Modal } from 'Common/components/ui';
import { useModalStore } from 'Common/store/selectors';
import { ReactElement } from 'react';

export const LayoutModal = (): ReactElement => {
    const { currentModal } = useModalStore();
    return <Modal>{currentModal === '#createUser' && <CreateUserForm />}</Modal>;
};
