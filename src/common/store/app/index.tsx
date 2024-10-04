import { create } from 'zustand';
import { IAppStore } from './types';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useAppStore = create<IAppStore>()(
    devtools(
        immer(set => ({
            currentModal: null,
            modalData: null,

            /** Установка текущей модалки */
            setCurrentModal: modal =>
                set(state => {
                    state.currentModal = modal;
                }),

            /** Установка данных модалки. */
            setModalData: data =>
                set(state => {
                    state.modalData = data;
                }),
        })),
    ),
);
