import { ReactElement, useEffect } from 'react';
import styles from './flights-list.module.scss';
import { useFlightSchedules } from 'Common/api/shedules/hooks';
import { Table } from 'Common/components/ui/Table';
import { HEADER } from './list.consts';
import { Error, Loader } from 'Common/components';
import size from 'lodash/size';
import { Empty } from 'Common/components/ui/Empty';
import { useScheduleStore } from 'Common/store/schedule';
import { getRows } from './utils';

export const FlightList = (): ReactElement => {
    const { currentSchedule, setCurrentSchedule } = useScheduleStore();
    const { data: schedulesData, isLoading, isError } = useFlightSchedules();

    /** Получение строк таблицы. */
    const rows = getRows(schedulesData);

    /** Обнуление выбранного рейса при закрытии страницы */
    useEffect(() => {
        return () => {
            setCurrentSchedule(null);
        };
    }, []);

    const selectRowHandler = (id: unknown) => {
        const findedRow = schedulesData?.find(item => item.id === id);

        if (currentSchedule && currentSchedule.id === id) {
            setCurrentSchedule(null);
            return;
        }

        setCurrentSchedule(findedRow ?? null);
    };

    if (isError) {
        return <Error />;
    }

    if (isLoading) {
        return <Loader />;
    }

    if (size(schedulesData) === 0) {
        return <Empty />;
    }

    return (
        <div className={styles.wrapper}>
            <Table
                activeRowId={currentSchedule?.id}
                rowOnClick={selectRowHandler}
                rows={rows}
                header={HEADER}
            />
        </div>
    );
};
