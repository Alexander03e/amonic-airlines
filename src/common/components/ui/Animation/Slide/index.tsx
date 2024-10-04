import { AnimatePresence, motion } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
    isOpen: boolean;
    className?: string;
}

export const Slide = ({ children, isOpen, className }: IProps): ReactElement => {
    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    className={className}
                    style={{ overflow: 'hidden' }}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ height: 'auto', y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
