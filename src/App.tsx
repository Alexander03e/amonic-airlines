import 'Assets/styles/index.scss';
import { Header, Footer } from 'Common/components';
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
