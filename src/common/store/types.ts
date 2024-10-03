export type TCurrentModal = '#createUser' | '#forgotPassword' | null;

export interface IAppStore {
    currentModal: TCurrentModal;
    modalData: unknown;

    setCurrentModal: (modal: TCurrentModal) => void;
    setModalData: (data: unknown) => void;
}
