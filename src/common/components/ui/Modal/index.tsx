import { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick, useScrollblock } from 'Common/hooks';
import { useModalStore } from 'Common/store/app/selectors';
import isNil from 'lodash/isNil';
import { Icon } from '../Icon';
import CloseIcon from 'Assets/icons/close.svg?react';

import styles from './modal.module.scss';

interface ModalProps {
    withClose?: boolean;
    children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ children, withClose = true }) => {
    const { currentModal, setCurrentModal } = useModalStore();

    const closeHandler = (): void => {
        setCurrentModal(null);
    };

    /** Блокирование прокрутки, когда окно открыто */
    useScrollblock();

    const ref = useOutsideClick(closeHandler);

    return (
        <AnimatePresence mode='wait'>
            {!isNil(currentModal) && (
                <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    className={styles.overlay}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                    }}
                >
                    <div ref={ref} className={styles.inner}>
                        <motion.div
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles.content}
                            exit={{ opacity: 0, scale: 0.2 }}
                            initial={{ opacity: 0, scale: 0.2 }}
                            transition={{
                                duration: 0.3,
                                ease: 'easeInOut',
                            }}
                        >
                            {withClose && (
                                <Icon
                                    onClick={closeHandler}
                                    className={styles.icon}
                                    icon={<CloseIcon />}
                                />
                            )}
                            {children}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
