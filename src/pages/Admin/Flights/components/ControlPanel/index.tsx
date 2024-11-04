/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useUpdateSchedule } from 'Common/api/shedules/hooks';
import { Button } from 'Common/components';
import { Slide } from 'Common/components/ui/Animation';
import { useScheduleStore, useUpdatedScheduleStore } from 'Common/store/schedule';
import styles from './control-panel.module.scss';
import { useModalStore } from 'Common/store/app/selectors';
import UploadIcon from 'Assets/icons/upload.svg?react';
export const ControlPanel = () => {
    const { setCurrentModal, setModalData } = useModalStore();
    const { currentSchedule, setCurrentSchedule } = useScheduleStore();
    const { schedules, removeSchedule, setSchedule } = useUpdatedScheduleStore();
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

    const createSchedule = () => {
        setCurrentModal('#createSchedule');
    };

    const openEdit = () => {
        setCurrentModal('#changeschedule');
        setModalData(currentSchedule);
    };

    const finded = schedules.find(schedule => schedule.id === currentSchedule?.id);

    const removeFromUpdated = () => {
        if (!finded?.id || finded.id === 'NEW') return;

        removeSchedule(finded.id);
    };

    const removeAll = () => {
        setSchedule(null);
    };

    /** CSV PARSER */

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Button onClick={createSchedule} label='Добавить рейс' variant='primary' />
                <Button
                    label='Загрузить .csv файл'
                    onClick={() => setCurrentModal('#csvImport')}
                    icon={<UploadIcon />}
                />
                <Slide className={styles.wrapper} isOpen={!!currentSchedule}>
                    <Button onClick={updateSchedule} label={buttonTitle} />
                    <Button onClick={openEdit} variant='secondary' label='Изменить рейс' />
                    {finded && (
                        <Button
                            onClick={removeFromUpdated}
                            variant='danger'
                            label='Сбросить изменения'
                        />
                    )}
                </Slide>
            </div>
            <div className={styles.right}>
                {Boolean(schedules.length) && (
                    <>
                        <Button variant='empty' label='Cбросить все' onClick={removeAll} />
                        <span className={styles.count}>{`( ${schedules.length} )`}</span>
                    </>
                )}
                <span>измененный рейс -</span>
                <div />
            </div>
        </div>
    );
};
