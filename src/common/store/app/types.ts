export type TCurrentModal = '#createUser' | '#forgotPassword' | '#changeUser' | null;

export interface IAppStore {
    currentModal: TCurrentModal;
    modalData: unknown;

    setCurrentModal: (modal: TCurrentModal) => void;
    setModalData: (data: unknown) => void;
}
