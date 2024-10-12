import { useShallow } from 'zustand/shallow';
import { useAppStore } from '.';

export const useModalStore = () => {
    return useAppStore(
        useShallow(({ currentModal, modalData, setCurrentModal, setModalData }) => ({
            currentModal,
            modalData,
            setCurrentModal,
            setModalData,
        })),
    );
};
