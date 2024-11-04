/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Form } from 'Common/components/ui';
import Papa from 'papaparse';
import { ChangeEvent, useState } from 'react';
import styles from './csv-report.module.scss';
import { handleToastWithPromise } from 'Common/components/ui/Toast';
import { useAddSurveys } from 'Common/api/survey/hooks';

export interface ICSVFile {
    departureAirport: string | null;
    arrivalAirport: string | null;
    age: string | null;
    gender: boolean | null;
    cabinType: 'Economy' | 'Business' | 'First Class' | 0;
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    month: string;
    year: string;
}

export interface IPapaCSVFile {
    Departure: string;
    Arrival: string;
    Age: string;
    Gender: 'F' | 'M';
    CabinType: 'Economy' | 'Business' | 'First';
    TravelClass?: 'Economy' | 'Business' | 'First Class';
    Q1: string;
    Q2: string;
    Q3: string;
    Q4: string;
}

export const FormCSVReports = () => {
    const [csvData, setCsvData] = useState<ICSVFile[]>([]);
    const { mutateAsync: addSurvey, isError, isPending } = useAddSurveys();

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCsvData([]);
        /** @ts-ignore */
        let currentFileMonth = event.target.files[0].name.split('.').shift()?.split('_').pop();

        if (currentFileMonth && currentFileMonth.startsWith('0')) {
            currentFileMonth = currentFileMonth.substring(1);
        }

        /** @ts-ignore */
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results: Papa.ParseResult<IPapaCSVFile>) {
                results.data.map(d => {
                    const cabinType = d['CabinType'] || d['TravelClass'];
                    setCsvData(prev => [
                        ...prev,
                        {
                            departureAirport: d['Departure'] ?? 0,
                            arrivalAirport: d['Arrival'] ?? 0,
                            age: d['Age'] ?? null,
                            cabinType: cabinType
                                ? cabinType === 'First'
                                    ? 'First Class'
                                    : cabinType
                                : 0,
                            gender: d['Gender'] ? (d['Gender'] === 'M' ? true : false) : null,
                            q1: d['Q1'] ?? 0,
                            q2: d['Q2'] ?? 0,
                            q3: d['Q3'] ?? 0,
                            q4: d['Q4'] ?? 0,
                            month: currentFileMonth ?? '',
                            year: new Date().getFullYear().toString(),
                        },
                    ]);
                });
            },
        });
    };

    const onSubmit = async () => {
        // TODO: Пофиксить типизацию (сейчас неправильная)
        handleToastWithPromise(
            // @ts-ignore
            () => addSurvey(csvData),
            'Успешно',
            'Загрузка...',
            'Произошла ошибка при загрузке отчётов',
            () => {
                setCsvData([]);
            },
        );
    };

    const isData = Boolean(csvData.length);
    return (
        <Form error={isError ? 'Произошла ошибка' : ''} label='Загрузить отчёты'>
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
                    <p>Полученных отчетов: {csvData.length}</p>
                </fieldset>
            )}
            <Button
                onClick={onSubmit}
                type='button'
                label='Загрузить'
                variant='secondary'
                isLoading={isPending}
                disabled={!isData}
            />
        </Form>
    );
};
