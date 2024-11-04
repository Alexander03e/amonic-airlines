import { Button, Form, LabeledInput } from 'Common/components/ui';
import { useForm } from 'react-hook-form';
import { schema, TEditTime } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useAppStore } from 'Common/store/app';
import { useUserLogsUpdateById } from 'Common/api/logs/hooks';
import { errorToast } from 'Common/components/ui/Toast';
import { toast } from 'react-toastify';
export const EditTimeOut = () => {
    const { modalData, setCurrentModal } = useAppStore();
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm<TEditTime>({ mode: 'onChange', resolver: zodResolver(schema) });

    const { mutateAsync: updateLogs } = useUserLogsUpdateById();

    const currentId = modalData as number;

    const onSave = async (data: TEditTime) => {
        try {
            await updateLogs({
                id: currentId,
                logOutTime: data.time,
                crashReason: data.reason,
            });
            toast('Данные успешно обновлены');
            setCurrentModal(null);
        } catch (e) {
            console.log(e);
            errorToast('Ошибка при обновлении данных');
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSave)} label='Напишите причину и время выхода'>
            <DevTool control={control} />
            <LabeledInput
                {...register('reason')}
                error={errors.reason?.message}
                label='Причина выхода'
            />
            <LabeledInput
                {...register('time')}
                error={errors.time?.message}
                type='datetime-local'
                label='Время выхода'
            />
            <Button variant='secondary' label='Сохранить' />
        </Form>
    );
};
