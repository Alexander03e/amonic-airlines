/* eslint-disable @typescript-eslint/ban-ts-comment */
import styles from './summary-report.module.scss';
import { useSurveyStore } from 'Common/store/survey';
import { Button, Error, Loader } from 'Common/components';
import { useSummaryReport } from 'Common/api/survey/hooks';
import { Table } from 'Common/components/ui/Table';

export const SummaryReport = () => {
    const { currentDate } = useSurveyStore();

    const { mutateAsync, data, isError, isPending } = useSummaryReport();
    const onFetch = async () => {
        if (!currentDate.month || !currentDate.year) return;
        mutateAsync({
            month: Number(currentDate.month),
            year: Number(currentDate.year),
        });
    };
    // const options = {};

    // @ts-ignore
    // const dataOptions = Object.entries(data ?? []).map((key: keyof IShortReport, value) => {
    //     if (key === '18-24' || key === '25-39' || key === '40-59' || key === '60+') {
    //         // @ts-ignore
    //         options['age'] = {
    //             // @ts-ignore
    //             ...options['age'],
    //             [key]: value,
    //         };
    //     } else if (key === 'AUH' || key === 'BAH' || key === )
    // });

    // @ts-ignore
    const dataHeader = Object.entries(data ?? []).map(([key]) => key);
    const dataOptions = Object.values(data ?? []).map(item => item);
    console.log(dataOptions, dataHeader);
    return (
        <div className={styles.wrapper}>
            <h3>Суммарный отчёт</h3>

            <Button
                disabled={!currentDate.month || !currentDate.year}
                label='Запросить данные'
                onClick={onFetch}
                isLoading={isPending}
            />
            {isPending && <Loader />}
            {isError && <Error />}
            {data && <Table header={dataHeader} rows={[{ data: dataOptions, id: 1 }]} />}
        </div>
    );
};
