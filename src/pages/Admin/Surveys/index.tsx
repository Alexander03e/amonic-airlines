import { Button, Container, LabeledInput } from 'Common/components';
import styles from './survey.module.scss';
import UploadIcon from 'Assets/icons/upload.svg?react';
import { useAppStore } from 'Common/store/app';
import ChartIcon from 'Assets/icons/chart.svg?react';
import CalendarIcon from 'Assets/icons/calendar.svg?react';
import { useSurveyStore } from 'Common/store/survey';
import { DetailReport } from 'Src/modules/Surveys/DetailReport';
import { SummaryReport } from 'Src/modules/Surveys/SummaryReport';
import { ChangeEvent } from 'react';

export const SurveyPage = () => {
    const { currentWindow, setCurrentWindow, setCurrentDate } = useSurveyStore();
    const { setCurrentModal } = useAppStore();

    const onCsvUpload = () => {
        setCurrentModal('#uploadReports');
    };

    const onChangeMonth = (e: ChangeEvent<HTMLInputElement>) => {
        let month = e.target?.value.split('-')[1];
        const year = e.target?.value.split('-')[0];
        if (!month || !year) return;

        if (month.startsWith('0')) {
            month = month.substring(1);
        }

        if (month && year) {
            setCurrentDate({ month: month, year });
        }
    };

    const onReset = () => {
        setCurrentWindow('#buttons');
        setCurrentDate(null);
    };

    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.top}>
                    <Button
                        onClick={onCsvUpload}
                        icon={<UploadIcon />}
                        label='Загрузить .csv отчёт'
                    />
                    <Button
                        onClick={() => setCurrentWindow('#summary')}
                        variant={currentWindow === '#summary' ? 'secondary' : 'primary'}
                        icon={<CalendarIcon />}
                        label='Получить суммарный отчёт'
                    />
                    <Button
                        onClick={() => setCurrentWindow('#details')}
                        variant={currentWindow === '#details' ? 'secondary' : 'primary'}
                        icon={<ChartIcon />}
                        label='Получить детализированный отчёт'
                    />
                    {currentWindow !== '#buttons' && (
                        <Button variant='empty' onClick={onReset} label='Закрыть отчет' />
                    )}
                </div>
                {currentWindow !== '#buttons' && (
                    <div className={styles.reportWindow}>
                        <LabeledInput type='month' onChange={onChangeMonth} />
                        {currentWindow === '#details' && <DetailReport />}
                        {currentWindow === '#summary' && <SummaryReport />}
                    </div>
                )}
            </Container>
        </div>
    );
};
