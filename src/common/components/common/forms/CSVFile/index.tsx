/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Form } from 'Common/components/ui';
import Papa from 'papaparse';
import { ChangeEvent, useState } from 'react';
import styles from './csv.module.scss';
import { useUploadSchedules } from 'Common/api/shedules/hooks';
import { IUpdateSchedule, TUpdateAction } from 'Common/types/flights';
import { handleToastWithPromise } from 'Common/components/ui/Toast';
import { useAppStore } from 'Common/store/app';

export interface ICSVFile {
    flightNumber: string;
    action: string;
    aircraft: string;
    date: string;
    time: string;
    departureAirport: string;
    arrivalAirport: string;
    economyPrice: string;
    confirmed: boolean;
}

export const FormCSVFile = () => {
    const [csvData, setCsvData] = useState<ICSVFile[]>([]);
    const { setCurrentModal } = useAppStore();
    const { mutateAsync, isError, isPending } = useUploadSchedules();

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCsvData([]);
        /** @ts-ignore */
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                results.data.map(d => {
                    const parsed = Object.keys(d as object);
                    console.log(parsed);
                    setCsvData(prev => [
                        ...prev,
                        {
                            aircraft: parsed[0],
                            flightNumber: parsed[1],
                            action: parsed[2],
                            date: parsed[3],
                            time: parsed[4],
                            departureAirport: parsed[5],
                            arrivalAirport: parsed[6],
                            economyPrice: parsed[7],
                            confirmed: parsed[8] == 'OK' ? true : false,
                        },
                    ]);
                });
            },
        });
    };

    const onSubmit = async () => {
        // @ts-ignore
        const parsedData: IUpdateSchedule[] = csvData.map(item => ({
            flightNumber: Number(item.flightNumber),
            action: item.action as unknown as TUpdateAction,
            aircraft: String(item.aircraft),
            date: item.date,
            time: item.time,
            departureAirport: item.departureAirport,
            arrivalAirport: item.arrivalAirport,
            economyPrice: String(item.economyPrice),
            confirmed: item.confirmed ? 'OK' : 'CANCEL',
        }));

        try {
            await handleToastWithPromise(
                () => mutateAsync(parsedData),
                'Изменения сохранены',
                'Сохранение изменений',
                'Произошла ошибка',
                () => {
                    setCurrentModal(null);
                    setCsvData([]);
                },
            );
        } catch (e: unknown) {
            console.log('er', e);
        }
    };

    const isData = Boolean(csvData.length);
    return (
        <Form error={isError ? 'Произошла ошибка' : ''} label='Загрузка данных с изменениями'>
            <input
                type='file'
                name='file'
                onChange={changeHandler}
                accept='.csv'
                placeholder='Загрузите csv'
                style={{ display: 'block', margin: '10px auto' }}
            />
            {isData && (
                <fieldset className={styles.fieldset}>
                    <legend>Данные файла</legend>
                    <p>Рейсов для изменения: {csvData.length}</p>
                    <p>Подтвержденных рейсов: {csvData.map(item => item.confirmed).length}</p>
                </fieldset>
            )}
            <Button
                onClick={onSubmit}
                type='button'
                label='Подтвердить'
                variant='secondary'
                isLoading={isPending}
                disabled={!isData}
            />
        </Form>
    );
};
