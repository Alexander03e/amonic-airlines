import { Button, Container } from 'Common/components';
import styles from './booking.module.scss';
import { BookingSearch } from 'Src/modules/Booking/Search';
import { useBookingStore } from 'Common/store/booking';
import { EBookingStep } from 'Common/store/booking/enums';
import { BookingPassengers } from 'Src/modules/Booking/Passengers';
import BackIcon from 'Assets/icons/back.svg?react';
export const BookingPage = () => {
    const { step, setStep, setPassengers, setSelectedOutbound, setSelectedReturn } =
        useBookingStore();

    const onClickBack = () => {
        setSelectedOutbound(null);
        setSelectedReturn(null);
        setPassengers(null);

        switch (step) {
            case EBookingStep.PASSENGERS:
                setStep(EBookingStep.SEARCH);
                break;
            case EBookingStep.PAYMENT:
                setStep(EBookingStep.PAYMENT);
                break;
            default:
                break;
        }
    };

    return (
        <div className={styles.wrapper}>
            <Container>
                {step !== EBookingStep.SEARCH && (
                    <Button
                        icon={<BackIcon />}
                        className={styles.back}
                        onClick={onClickBack}
                        label='Назад'
                        variant='empty'
                    />
                )}
                {step === EBookingStep.SEARCH && <BookingSearch />}
                {step === EBookingStep.PASSENGERS && <BookingPassengers />}
            </Container>
        </div>
    );
};
