import { FC, ReactNode } from 'react';
import styles from './modal.module.scss'; // Импортируем SCSS-модуль стилей
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick, useScrollblock } from 'Common/hooks';

interface ModalProps {
    isOpen: boolean; // Управляет видимостью модального окна
    onClose: () => void; // Функция для закрытия модального окна
    title?: string; // Опциональный заголовок модального окна
    children: ReactNode; // Содержимое модального окна
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const closeHandler = (): void => {
        if (!onClose) return;
        onClose();
    };

    /** Блокирование прокрутки, когда окно открыто */
    useScrollblock();

    const ref = useOutsideClick(closeHandler);

    return (
        <AnimatePresence mode='wait'>
            {isOpen && (
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
                            {children}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
