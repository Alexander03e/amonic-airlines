import { create } from 'zustand';
import { IUserStore } from './types';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useUserStore = create<IUserStore>()(
    devtools(
        immer(set => ({
            user: null,
            timeSpent: null,
            currentSessionId: null,

            setCurrentSessionId(time) {
                set(state => {
                    state.currentSessionId = time;
                });
            },
            setTimespent(time) {
                set(state => {
                    state.timeSpent = time;
                });
            },

            setUser: user =>
                set(state => {
                    state.user = user;
                }),
        })),
    ),
);
