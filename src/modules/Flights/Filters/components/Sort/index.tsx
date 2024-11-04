import { LabeledDropdown } from 'Common/components';
import { useScheduleStore } from 'Common/store/schedule';
import { ReactElement } from 'react';

export const Sort = (): ReactElement => {
    const options = [
        { value: 'date/asc', label: 'По дате ▼' },
        { value: 'cost/asc', label: 'По цене ▼' },
        { value: 'cost/desc', label: 'По цене ▲' },
        { value: 'confirmed/true', label: 'Подтвержденные' },
        { value: 'confirmed/false', label: 'Неподтвержденные' },
    ];

    const { updateScheduleFilters } = useScheduleStore();

    const handleChange = (value: unknown) => {
        updateScheduleFilters({ sort: value ? String(value) : null });
    };

    return <LabeledDropdown options={options} onChange={handleChange} label='Сортировка' />;
};
