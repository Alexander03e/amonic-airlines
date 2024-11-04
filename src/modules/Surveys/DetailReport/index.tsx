import { useSurveyStore } from 'Common/store/survey';
import styles from './detail-report.module.scss';
import { Button, Error, Loader } from 'Common/components';
import { useDetailReport } from 'Common/api/survey/hooks';
import { Table } from 'Common/components/ui/Table';

export const DetailReport = () => {
    const { currentDate } = useSurveyStore();

    const { mutateAsync, data, isError, isPending } = useDetailReport();
    const onFetch = async () => {
        if (!currentDate.month || !currentDate.year) return;
        mutateAsync({
            month: Number(currentDate.month),
            year: Number(currentDate.year),
        });
    };

    console.log(data);

    const questions = Object.entries(data ?? []).map(([key, value]) => {
        if (key === '1') {
            return {
                label: 'Пожалуйста, оцените наш самолет, на котором вы летали.',
                data: value,
            };
        } else if (key === '2') {
            return {
                label: 'Как вы оцените наш персонал?',
                data: value,
            };
        } else if (key === '3') {
            return {
                label: 'Как вы оцените наши развлечения в полете?',
                data: value,
            };
        } else if (key === '4') {
            return {
                label: 'Оцените цену билетов, которые вы брали.',
                data: value,
            };
        }
    });

    console.log(questions);

    return (
        <div className={styles.wrapper}>
            <h3>Детальный отчёт</h3>

            <Button
                disabled={!currentDate.month || !currentDate.year}
                label='Запросить данные'
                onClick={onFetch}
                isLoading={isPending}
            />
            {isPending && <Loader />}
            {isError && <Error />}
            {questions &&
                questions.map((item, index) => {
                    const options = Object.values(item?.data ?? []).map((item, i) => {
                        return {
                            data: Object.values(item).map(el => el),
                            id: i + 1,
                        };
                    });

                    let header;

                    const itemData = item?.data && Object.values(item?.data);

                    if (itemData) {
                        console.log(itemData[0]);
                        header = Object.keys(itemData[0]);
                    }

                    console.log(header);

                    return (
                        <div className={styles.tableItem}>
                            <p>{item?.label}</p>
                            <Table
                                header={index === 0 && header ? header : undefined}
                                className={styles.table}
                                rows={options}
                            />
                        </div>
                    );
                })}
        </div>
    );
};
