import { useEffect } from 'react';

export const useScrollblock = () => {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'initial';
        };
    }, []);
};
