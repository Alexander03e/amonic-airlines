import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

/** Код клавиши ESC. */
const ESC = 'Escape';

export const useOutsideClick = <T extends HTMLElement = HTMLDivElement>(
    callback: (e: MouseEvent | TouchEvent | KeyboardEvent) => void,
    noEsc: boolean | null = null,
): RefObject<T> => {
    const ref = useRef<T | null>(null);

    useEffect((): (() => void) => {
        const handleClick = (event: MouseEvent): void => {
            if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
                callback(event);
            }
        };

        const handleTouch = (event: TouchEvent): void => {
            if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
                callback(event);
            }
        };

        const handleESC = (event: KeyboardEvent): void => {
            if (event.key === ESC) {
                callback(event);
            }
        };

        document.addEventListener('mousedown', handleClick, true);
        document.addEventListener('touchstart', handleTouch, true);

        if (!noEsc) {
            document.addEventListener('keyup', handleESC, true);
        }

        return (): void => {
            document.removeEventListener('mousedown', handleClick, true);
            document.removeEventListener('touchstart', handleTouch, true);

            if (!noEsc) {
                document.removeEventListener('keyup', handleESC, true);
            }
        };
    }, [ref, callback, noEsc]);

    return ref;
};
