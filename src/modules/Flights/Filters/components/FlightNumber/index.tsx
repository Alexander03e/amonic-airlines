import { LabeledInput } from 'Common/components';
import { useScheduleStore } from 'Common/store/schedule';

export const FlightNumber = () => {
    const { updateScheduleFilters, scheduleFilters } = useScheduleStore();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        updateScheduleFilters({ flightNumber: value ?? null });
    };

    return (
        <LabeledInput
            value={scheduleFilters?.flightNumber ?? ''}
            onChange={onChange}
            placeholder='Введите значение'
            label='Номер рейса'
        />
    );
};
