import { CreateUserForm, ChangeUser, ChangeSchedule } from 'Common/components/common';
import { BlockUser } from 'Common/components/common/forms/BlockUser';
import { ConfirmPayment } from 'Common/components/common/forms/ConfirmPayment';
import { CreateSchedule } from 'Common/components/common/forms/CreateSchedule';
import { FormCSVFile } from 'Common/components/common/forms/CSVFile';
import { FormCSVReports } from 'Common/components/common/forms/CSVReport';
import { EditTimeOut } from 'Common/components/common/forms/EditTimeOut';
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
            {currentModal === '#blockUser' && <BlockUser />}
            {currentModal === '#confirmPayment' && <ConfirmPayment />}
            {currentModal === '#csvImport' && <FormCSVFile />}
            {currentModal === '#createSchedule' && <CreateSchedule />}
            {currentModal === '#editTimeOut' && <EditTimeOut />}
            {currentModal === '#uploadReports' && <FormCSVReports />}
        </Modal>
    );
};
