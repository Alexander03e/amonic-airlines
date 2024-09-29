import 'Assets/styles/index.scss';
import { Header, Footer } from 'Common/components';
import { Page } from 'Common/components/layout/Page';
import { AuthPage } from 'Pages/Auth';

function App() {
    return (
        <>
            <Header />

            <Page>
                <AuthPage />
            </Page>

            <Footer />
        </>
    );
}

export default App;
