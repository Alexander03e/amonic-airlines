/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactElement, useEffect, useMemo, useState } from 'react';
import styles from './flights-list.module.scss';
import { useSchedulesBySearch } from 'Common/api/shedules/hooks';
import { Table } from 'Common/components/ui/Table';
import map from 'lodash/map';
import { HEADER } from './list.consts';
import { Error, Loader } from 'Common/components';
import size from 'lodash/size';
import { Empty } from 'Common/components/ui/Empty';
import { useScheduleStore, useUpdatedScheduleStore } from 'Common/store/schedule';
import { KF } from 'Common/consts/common';

export const FlightList = (): ReactElement => {
    const { currentSchedule, setCurrentSchedule, scheduleFilters, shoudUpdate, setShouldUpdate } =
        useScheduleStore();

    const { schedules } = useUpdatedScheduleStore();
    const {
        data: schedulesData,
        isLoading,
        isError,
        refetch,
    } = useSchedulesBySearch(
        {
            arrivalAirport: scheduleFilters.to ?? undefined,
            departureAirport: scheduleFilters.from ?? undefined,
            date: scheduleFilters.date ?? undefined,
        },
        true,
        () => {},
    );

    const [filtered, setFiltered] = useState(schedulesData);

    useEffect(() => {
        setFiltered(schedulesData);

        if (scheduleFilters.flightNumber) {
            setFiltered(prev =>
                prev?.filter(item => item.flightNumber === scheduleFilters.flightNumber),
            );
        }

        setShouldUpdate(false);
        console.log(scheduleFilters.sort);
    }, [scheduleFilters.flightNumber, schedulesData, shoudUpdate]);

    useEffect(() => {
        refetch();
    }, [shoudUpdate]);

    const rows = useMemo(
        () =>
            map(filtered, item => {
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
                          `${Math.round(Number(findedItem?.economyPrice) * KF.BUSINESS)}$`,
                          `${Math.round(Number(findedItem?.economyPrice) * KF.FIRST)}$`,
                      ]
                    : [
                          item?.date,
                          item?.time,
                          item?.route?.departureAirport?.iatacode,
                          item?.route?.arrivalAirport?.iatacode,
                          item?.flightNumber,
                          item?.aircraft?.makeModel,
                          `${item?.economyPrice}$`,
                          `${Math.round(Number(item?.economyPrice) * KF.BUSINESS)}$`,
                          `${Math.round(Number(item?.economyPrice) * KF.FIRST)}$`,
                      ];

                return {
                    isError: !item.confirmed,
                    isEdited: Boolean(finded),
                    id: item.id,
                    data: data,
                };
            }),
        [filtered, schedules],
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
            {!isError ? (
                <Table
                    activeRowId={currentSchedule?.id}
                    rowOnClick={selectRowHandler}
                    rows={
                        scheduleFilters?.flightNumber
                            ? rows.filter(row => row.data[4] === scheduleFilters.flightNumber)
                            : rows
                    }
                    header={HEADER}
                />
            ) : (
                <p>Произошла ошибка при загрузке.</p>
            )}
        </div>
    );
};
