import 'Assets/styles/index.scss';
import { Footer, Header } from 'Common/components';
import { AppRoutes } from './routes';

function App() {
    return (
        <>
            <Header />

            <AppRoutes />

            <Footer />
        </>
    );
}

export default App;
