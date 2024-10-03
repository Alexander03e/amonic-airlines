import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from 'Common/components/provider/index.ts';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>,
);
