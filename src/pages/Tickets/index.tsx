import { Button, Container } from 'Common/components';
import styles from './tickets.styles.module.scss';
import { useNavigate } from 'react-router-dom';
import BackIcon from 'Assets/icons/back.svg?react';
import { TicketsEdit } from 'Src/modules/Tickets/Edit';
import { useTicketStore } from 'Common/store/tickets';
import { useEffect } from 'react';

export const TicketsPage = () => {
    const { clear } = useTicketStore();

    useEffect(() => {
        clear();
    }, []);

    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(-1);
    };
    return (
        <Container>
            <Button
                onClick={onBackClick}
                variant='empty'
                label='Назад к авторизации'
                icon={<BackIcon />}
            />

            <div className={styles.wrapper}>
                <TicketsEdit />
            </div>
        </Container>
    );
};
