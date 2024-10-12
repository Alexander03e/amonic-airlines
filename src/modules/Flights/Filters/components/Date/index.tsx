import { LabeledInput } from 'Common/components';
import { useScheduleStore } from 'Common/store/schedule';
import { ChangeEvent } from 'react';

export const DateFilter = () => {
    const { updateScheduleFilters } = useScheduleStore();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        updateScheduleFilters({ date: value ?? null });
    };

    return <LabeledInput onChange={onChange} type='date' label='Дата рейса' />;
};
