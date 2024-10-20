import { BookingSearchForm } from 'Common/components/common/forms/BookingSearch';
import styles from './booking-search.module.scss';
import { useFlightSchedules } from 'Common/api/shedules/hooks';
import { useBookingStore } from 'Common/store/booking';
import { EBookingSearchType } from 'Common/components/common/forms/BookingSearch/enums';
import { getScheduleOptions } from './utils';
import { Table } from 'Common/components/ui/Table';
import { HEADER, LABELS } from './consts';
import { Slide } from 'Common/components/ui/Animation';
import { Button, LabeledInput } from 'Common/components';
import { useEffect, useMemo } from 'react';
import { EBookingStep } from 'Common/store/booking/enums';

export const BookingSearch = () => {
    const { data, isLoading } = useFlightSchedules();

    const {
        bookingType,
        cabinType,
        selectedFlights,
        setSelectedReturn,
        setOutboundFlights,
        setReturnFlights,
        setSelectedOutbound,
        outboundFlights,
        returnFlights,
        setStep,
    } = useBookingStore();

    useEffect(() => {
        setOutboundFlights(null);
        setReturnFlights(null);
    }, []);

    const outboundArray = outboundFlights
        ? outboundFlights.map(arr => {
              if (arr.length > 1) {
                  return {
                      ...arr[0],
                      economyPrice: arr.reduce((acc, value) => value.economyPrice + acc, 0),
                      route: {
                          ...arr[0].route,
                          arrivalAirport: arr[arr.length - 1].route.arrivalAirport,
                      },
                      transferCount: arr.length - 1,
                      transfers: arr,
                  };
              } else {
                  return arr[0];
              }
          })
        : null;

    const returnArray = returnFlights
        ? returnFlights.map(arr => {
              if (arr.length > 1) {
                  return {
                      ...arr[0],
                      economyPrice: arr.reduce((acc, value) => value.economyPrice + acc, 0),
                      route: {
                          ...arr[0].route,
                          arrivalAirport: arr[arr.length - 1].route.arrivalAirport,
                      },
                      transferCount: arr.length - 1,
                      transfers: arr,
                  };
              } else {
                  return arr[0];
              }
          })
        : null;

    const outboundOptions = getScheduleOptions(outboundArray ?? data, cabinType?.name ?? null);

    const returnOptions = getScheduleOptions(returnArray ?? data, cabinType?.name ?? null);

    const handeSelect = (id: unknown, type: 'return' | 'outbound') => {
        switch (type) {
            case 'outbound':
                {
                    const arr = outboundArray ?? data;
                    const finded = arr?.find(item => item.id === id);

                    if (!finded) return;
                    if (selectedFlights.outbound?.id === finded.id) {
                        setSelectedOutbound(null);
                        return;
                    }
                    setSelectedOutbound({ cabinType, ...finded });
                }
                break;
            case 'return':
                {
                    const arr = returnArray ?? data;

                    const finded = arr?.find(item => item.id === id);
                    if (!finded) return;
                    if (selectedFlights.return?.id === finded.id) {
                        setSelectedReturn(null);
                        return;
                    }
                    setSelectedReturn({ cabinType, ...finded });
                }
                break;
            default:
                break;
        }
    };

    const selectedLength = useMemo(
        () => Object.values(selectedFlights)?.filter(item => Boolean(item))?.length,
        [selectedFlights],
    );

    const nextStep = () => {
        setStep(EBookingStep.PASSENGERS);
    };

    const nextBtnDisabled = selectedLength === 0;

    return (
        <div className={styles.wrapper}>
            <div className={styles.tables}>
                <fieldset>
                    <legend>{LABELS.OUTBOUND}</legend>
                    <Table
                        isLoading={isLoading}
                        activeRowId={selectedFlights.outbound?.id}
                        rowOnClick={(id: unknown) => handeSelect(id, 'outbound')}
                        className={styles.table}
                        header={HEADER}
                        rows={outboundOptions}
                    />
                </fieldset>

                <Slide isOpen={bookingType === EBookingSearchType.RETURN}>
                    <fieldset>
                        <legend>{LABELS.RETURN}</legend>

                        <Table
                            activeRowId={selectedFlights.return?.id}
                            rowOnClick={(id: unknown) => handeSelect(id, 'return')}
                            className={styles.table}
                            header={HEADER}
                            rows={returnOptions}
                        />
                    </fieldset>
                </Slide>
            </div>
            <div className={styles.form}>
                <BookingSearchForm />
                <div className={styles.info}>
                    {Boolean(selectedLength) && (
                        <span>{`Выбран(о) ${selectedLength} рейс(ов)`}</span>
                    )}
                </div>
                <div className={styles.settings}>
                    <LabeledInput placeholder={LABELS.PLACEHOLDER} label={LABELS.PASSENGERS} />
                    <Button
                        onClick={nextStep}
                        disabled={nextBtnDisabled}
                        variant='secondary'
                        label={nextBtnDisabled ? LABELS.HINT : LABELS.NEXT}
                    />
                </div>
            </div>
        </div>
    );
};
