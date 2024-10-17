import cn from 'classnames';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import map from 'lodash/map';
import { useEffect, useState, type ReactElement } from 'react';
import { SideMenuItem as Item } from './components/item';
import { ESidebarVariant } from './enums';
import type { ILeftSideBarItem, TItemValue } from './types';
import styles from './side-menu.module.scss';

interface IProps {
    initialOpen?: boolean;
    items?: ILeftSideBarItem[];
    onSelect?: (value: TItemValue) => void;
    activeItem?: TItemValue;
    className?: string;
}

export function SideMenu({
    items,
    initialOpen = true,
    onSelect,
    activeItem,
    className,
}: IProps): ReactElement {
    const [open, setOpen] = useState(initialOpen);
    const [selectedItem, setSelectedItem] = useState(activeItem);
    const controls = useAnimation();

    /** Обработчик выбора элемента. */
    const handleSelectItem = (value: TItemValue): void => {
        if (value === undefined) return;
        if (!onSelect) {
            setSelectedItem(value);

            return;
        }

        onSelect(value);
    };

    /** Обработчик открытия/закрытия сайдбара. */
    const handleToggle = (): void => {
        setOpen(prev => !prev);
    };

    useEffect(() => {
        if (open) {
            controls.start(ESidebarVariant.LONG);
        } else {
            controls.start(ESidebarVariant.SHORT);
        }
    }, [open]);

    const triggerTitle = open ? 'C' : 'C';

    return (
        <AnimatePresence>
            <motion.div
                animate={controls}
                className={cn(styles.wrapper, className, {
                    [styles.open]: open,
                })}
                initial={{ width: '300px' }}
                transition={{
                    duration: 0.3,
                }}
                variants={{
                    [ESidebarVariant.SHORT]: { width: 'fit-content' },
                    [ESidebarVariant.LONG]: { width: '216px' },
                }}
            >
                <button className={styles.trigger} onClick={handleToggle}>
                    {triggerTitle}
                </button>
                <div className={styles.items}>
                    {map(items, item => {
                        const isActive = onSelect
                            ? item.value === activeItem
                            : item.value === selectedItem;

                        const onClick = (): void => {
                            handleSelectItem(item.value);
                        };

                        return (
                            <Item isActive={isActive} isOpen={open} onClick={onClick} {...item} />
                        );
                    })}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
