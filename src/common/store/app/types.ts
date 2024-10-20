export type TCurrentModal =
    | '#createUser'
    | '#forgotPassword'
    | '#changeUser'
    | '#changeschedule'
    | '#blockUser'
    | '#confirmPayment'
    | null;

export interface IAppStore {
    currentModal: TCurrentModal;
    modalData: unknown;

    setCurrentModal: (modal: TCurrentModal) => void;
    setModalData: (data: unknown) => void;
}
