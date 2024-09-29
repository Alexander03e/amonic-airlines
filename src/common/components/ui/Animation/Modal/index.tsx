import { AnimatePresence, motion } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';

interface IProps {
    isOpen?: boolean;
    className?: string;
    children: ReactNode;
}

export const ModalAnimation = ({ children, className, isOpen }: IProps): ReactElement => {
    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    className={className}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.2 }}
                    initial={{ opacity: 0, scale: 0.2 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
