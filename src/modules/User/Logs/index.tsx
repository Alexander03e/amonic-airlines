import styles from './logs.module.scss';
import { useUserLogs } from 'Common/api/logs/hooks';
import { Table } from 'Common/components/ui/Table';
import { useState } from 'react';
import { HEADER } from './consts';
import { useUserStore } from 'Common/store/user';
import { formatTime } from 'Common/utils/formatTime';
import { formatTimeToRu } from '../../../common/utils/formatTimeToRu';
import { Error, Loader } from 'Common/components';

export const UserLogs = () => {
    const { user, setTimespent } = useUserStore();
    const [selectedRow, setSelectedRow] = useState<number | string | null>(null);

    const { data, isError, isLoading } = useUserLogs(user?.id);

    setTimespent(data?.timeSpend ?? '');

    const rows = data?.usersLogs.map(item => {
        const timeSpent = formatTime(
            Math.round(
                new Date(item.logOutTime ?? '').getTime() - new Date(item.logInTime).getTime(),
            ) / 1000,
        );
        const date = new Date(item.logInTime).toLocaleDateString();
        const loginTime = formatTimeToRu(item.logInTime);
        const logoutTime = formatTimeToRu(item.logOutTime);

        return {
            id: item.id,
            data: [
                date.toString(),
                loginTime.toString() ?? 'Не указано',
                logoutTime.toString() ?? 'Не указано',
                timeSpent.toString() ?? 'Не указано ',
                item.crashReason?.toString() ?? 'Не указана',
            ],
        };
    });

    const handleRowClick = (id: unknown) => {
        if (String(id) === String(selectedRow)) {
            setSelectedRow(null);
            return;
        }
        setSelectedRow(id as number);
    };

    if (isLoading) return <Loader />;

    if (isError) return <Error />;

    return (
        <div className={styles.wrapper}>
            {rows && (
                <Table
                    rowOnClick={handleRowClick}
                    header={HEADER}
                    rows={rows}
                    activeRowId={selectedRow}
                />
            )}
        </div>
    );
};
