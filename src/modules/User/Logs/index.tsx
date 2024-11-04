import styles from './logs.module.scss';
import { useUserLogs } from 'Common/api/logs/hooks';
import { Table } from 'Common/components/ui/Table';
import { useState } from 'react';
import { HEADER } from './consts';
import { useUserStore } from 'Common/store/user';
import { formatTime } from 'Common/utils/formatTime';
import { formatTimeToRu } from '../../../common/utils/formatTimeToRu';
import { Button, Error, Loader } from 'Common/components';
import last from 'lodash/last';
import { Slide } from 'Common/components/ui/Animation';
import { useAppStore } from 'Common/store/app';

export const UserLogs = () => {
    const { user, setTimespent, setCurrentSessionId } = useUserStore();
    const [selectedRow, setSelectedRow] = useState<number | string | null>(null);
    const { setCurrentModal, setModalData } = useAppStore();
    const { data, isError, isLoading } = useUserLogs(user?.id);

    setCurrentSessionId(last(data?.usersLogs ?? [])?.id ?? null);

    setTimespent(data?.timeSpend ?? '');

    const rows = data?.usersLogs.map(item => {
        const timeSpent = item?.logOutTime
            ? formatTime(
                  Math.round(
                      new Date(item.logOutTime ?? '').getTime() -
                          new Date(item.logInTime).getTime(),
                  ) / 1000,
              )
            : 'Не указано';
        const date = new Date(item.logInTime).toLocaleDateString();
        const loginTime = formatTimeToRu(item.logInTime);
        const logoutTime = formatTimeToRu(item.logOutTime);
        return {
            id: item.id,
            data: [
                date.toString(),
                loginTime.toString() ?? 'Не указано',
                logoutTime.toString() ?? 'Не указано',
                timeSpent?.toString() ?? 'Не указано ',
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

    const currentRow = rows?.find(item => item.id === selectedRow);

    const openEditTime = () => {
        setCurrentModal('#editTimeOut');
        setModalData(selectedRow);
    };

    return (
        <div className={styles.wrapper}>
            <Slide isOpen={!!selectedRow && !currentRow?.data[2]}>
                <Button onClick={openEditTime} label='Записать причину выхода' />
            </Slide>
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
