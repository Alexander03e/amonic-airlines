import { AnimatePresence, motion } from 'framer-motion';
import { ReactElement } from 'react';

interface IProps {
    children: ReactElement;
    isOpen: boolean;
    className?: string;
}

export const Height = ({ children, isOpen, className }: IProps): ReactElement => {
    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    className={className}
                    style={{ overflow: 'hidden' }}
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
