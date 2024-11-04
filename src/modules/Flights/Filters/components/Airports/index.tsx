import { useAirports } from 'Common/api/airports/hooks';
import { LabeledDropdown } from 'Common/components';
import map from 'lodash/map';
import { useScheduleStore } from 'Common/store/schedule';

export const Airports = () => {
    const { data, isError } = useAirports();

    const {
        scheduleFilters: { from, to },
        updateScheduleFilters,
    } = useScheduleStore();

    const options = map(data, item => {
        return {
            value: String(item.iatacode),
            label: item.iatacode,
        };
    });

    const handleSetFrom = (value: unknown) => {
        updateScheduleFilters({ from: String(value) });
    };

    const handleSetTo = (value: unknown) => {
        updateScheduleFilters({ to: String(value) });
    };

    if (isError) return null;

    return (
        <>
            <LabeledDropdown
                onChange={handleSetFrom}
                label='Аэропорт отправления'
                options={options.filter(option => option.value !== to)}
                value={from}
            />
            <LabeledDropdown
                value={to}
                onChange={handleSetTo}
                label='Аэропорт прибытия'
                options={options.filter(option => option.value !== from)}
            />
        </>
    );
};
