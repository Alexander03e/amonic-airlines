import { LabeledInput } from 'Common/components';
import { useScheduleStore } from 'Common/store/schedule';

export const FlightNumber = () => {
    const { updateScheduleFilters } = useScheduleStore();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        updateScheduleFilters({ flightNumber: value ?? null });
    };

    return <LabeledInput onChange={onChange} placeholder='Введите значение' label='Номер рейса' />;
};
