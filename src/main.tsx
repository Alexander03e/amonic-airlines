import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from 'Common/components/provider/index.ts';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from 'Common/components/provider/Query';
import { InitProvider } from 'Common/components/provider/Init/index.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename={import.meta.env.BASE_URL}>
        <QueryProvider>
            <AuthProvider>
                <InitProvider>
                    <App />
                </InitProvider>
            </AuthProvider>
        </QueryProvider>
    </BrowserRouter>,
);
