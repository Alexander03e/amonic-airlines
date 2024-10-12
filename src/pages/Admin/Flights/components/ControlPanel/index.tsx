import { useUpdateSchedule } from 'Common/api/shedules/hooks';
import { Button } from 'Common/components';
import { Height } from 'Common/components/ui/Animation';
import { useScheduleStore } from 'Common/store/schedule';

export const ControlPanel = () => {
    const { currentSchedule, setCurrentSchedule } = useScheduleStore();

    const buttonTitle = !currentSchedule?.confirmed ? 'Подтвердить рейс' : 'Отменить рейс';

    const { mutateAsync } = useUpdateSchedule();

    const updateSchedule = async () => {
        if (!currentSchedule) return;

        try {
            await mutateAsync({ id: currentSchedule.id, confirmed: !currentSchedule.confirmed });
            setCurrentSchedule({ ...currentSchedule, confirmed: !currentSchedule.confirmed });
        } catch (e) {
            alert('Возникла ошибка при обновлении рейса');
            throw new Error(`Update schedule error, ${e}`);
        }
    };

    return (
        <Height isOpen={!!currentSchedule}>
            <Button onClick={updateSchedule} label={buttonTitle} />
        </Height>
    );
};
