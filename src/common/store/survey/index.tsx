import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { ISurveyStore } from './types';

export const useSurveyStore = create<ISurveyStore>()(
    devtools(
        immer(set => ({
            currentWindow: '#buttons',
            currentDate: {
                month: null,
                year: null,
            },
            setCurrentDate: date =>
                set(state => {
                    if (date === null) {
                        state.currentDate = {
                            month: null,
                            year: null,
                        };
                        return;
                    }
                    state.currentDate = date;
                }),
            setCurrentWindow: window =>
                set(state => {
                    state.currentWindow = window;
                }),
        })),
    ),
);
