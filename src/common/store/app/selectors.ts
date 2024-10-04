import { useShallow } from 'zustand/shallow';
import { useAppStore } from '.';

export const useModalStore = () => {
    return useAppStore(
        useShallow(({ currentModal, modalData, setCurrentModal }) => ({
            currentModal,
            modalData,
            setCurrentModal,
        })),
    );
};
