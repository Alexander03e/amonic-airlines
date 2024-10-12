import { Container } from 'Common/components';
import styles from './flights-page.module.scss';
import { FlightList } from 'Modules';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Filters } from 'Src/modules/Flights/Filters';
import { ControlPanel } from './components/ControlPanel';

export const FlightsPage = () => {
    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.top}>
                    <Filters />
                    <ControlPanel />
                </div>
                <FlightList />
            </Container>
        </div>
    );
};
