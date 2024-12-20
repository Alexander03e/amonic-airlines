import { ReactElement, useEffect, useState } from 'react';
import { Airports } from './components/Airports';
import { useScheduleStore } from 'Common/store/schedule';
import { DateFilter } from './components/Date';
import { FlightNumber } from './components/FlightNumber';
import styles from './flight-filters.module.scss';
import { Button, Height } from 'Common/components';

export const Filters = (): ReactElement => {
    const { updateScheduleFilters, setShouldUpdate } = useScheduleStore();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        return () => {
            updateScheduleFilters({
                from: null,
                date: null,
                flightNumber: null,
                sort: null,
                to: null,
            });
        };
    }, []);

    const onSubmit = () => {
        setShouldUpdate(true);
    };

    const handleToggle = () => {
        setIsOpen(prev => !prev);
    };

    const openTitle = isOpen ? 'Закрыть фильтры' : 'Открыть фильтры';

    const reset = () => {
        updateScheduleFilters({
            from: null,
            date: null,
            flightNumber: null,
            sort: null,
            to: null,
        });
        setShouldUpdate(true);
    };

    return (
        <div className={styles.out}>
            <Button onClick={handleToggle} variant='empty' label={openTitle} />
            <Height className={styles.heightContainer} isOpen={isOpen}>
                <div className={styles.wrapper}>
                    <Airports />
                    <DateFilter />
                    <FlightNumber />
                    <Button onClick={onSubmit} label='Применить' variant='secondary' />
                    <Button onClick={reset} label='Сбросить' />
                </div>
            </Height>
        </div>
    );
};
