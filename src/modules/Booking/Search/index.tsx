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
import { useMemo } from 'react';
import { EBookingStep } from 'Common/store/booking/enums';

export const BookingSearch = () => {
    const { data, isLoading } = useFlightSchedules();

    const {
        bookingType,
        cabinType,
        selectedFlights,
        setSelectedReturn,
        setSelectedOutbound,
        setStep,
    } = useBookingStore();

    const tableOptions = getScheduleOptions(data, cabinType);

    const handeSelect = (id: unknown, type: 'return' | 'outbound') => {
        const finded = data?.find(schedule => schedule.id === id);

        if (!finded) return;

        switch (type) {
            case 'outbound':
                if (selectedFlights.outbound?.id === finded.id) {
                    setSelectedOutbound(null);
                    return;
                }
                setSelectedOutbound(finded);
                break;
            case 'return':
                if (selectedFlights.return?.id === finded.id) {
                    setSelectedReturn(null);
                    return;
                }
                setSelectedReturn(finded);
                break;
            default:
                break;
        }
    };

    console.log(cabinType)

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
                        rows={tableOptions}
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
                            rows={tableOptions}
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
