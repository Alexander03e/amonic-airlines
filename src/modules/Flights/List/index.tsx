import { ReactElement, useEffect, useMemo } from 'react';
import styles from './flights-list.module.scss';
import { useFlightSchedules } from 'Common/api/shedules/hooks';
import { Table } from 'Common/components/ui/Table';
import map from 'lodash/map';
import { HEADER } from './list.consts';
import { Error, Loader } from 'Common/components';
import size from 'lodash/size';
import { Empty } from 'Common/components/ui/Empty';
import { useScheduleStore, useUpdatedScheduleStore } from 'Common/store/schedule';

export const FlightList = (): ReactElement => {
    const { currentSchedule, setCurrentSchedule } = useScheduleStore();
    const { schedules } = useUpdatedScheduleStore();
    const { data: schedulesData, isLoading, isError } = useFlightSchedules();

    const rows = useMemo(
        () =>
            map(schedulesData, item => {
                const finded = schedules.find(schedule => schedule.id === item.id);
                const findedItem = finded?.item;

                const data = finded
                    ? [
                          findedItem?.date,
                          findedItem?.time,
                          findedItem?.departureAirport,
                          findedItem?.arrivalAirport,
                          item.flightNumber,
                          item.aircraft.makeModel,
                          String(findedItem?.economyPrice),
                          `${Math.round(Number(findedItem?.economyPrice) * 1.3)}$`,
                          `${Math.round(Number(findedItem?.economyPrice) * 1.755)}$`,
                      ]
                    : [
                          item.date,
                          item.time,
                          item.route.departureAirport.iatacode,
                          item.route.arrivalAirport.iatacode,
                          item.flightNumber,
                          item.aircraft.makeModel,
                          `${item.economyPrice}$`,
                          `${Math.round(Number(item.economyPrice) * 1.3)}$`,
                          `${Math.round(Number(item.economyPrice) * 1.755)}$`,
                      ];

                return {
                    isError: !item.confirmed,
                    isEdited: Boolean(finded),
                    id: item.id,
                    data: data,
                };
            }),
        [schedulesData, schedules],
    );

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
