import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider, LoggerProvider } from 'Common/components/provider/index.ts';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from 'Common/components/provider/Query';
import { InitProvider } from 'Common/components/provider/Init/index.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryProvider>
            <AuthProvider>
                <LoggerProvider>
                    <InitProvider>
                        <App />
                    </InitProvider>
                </LoggerProvider>
            </AuthProvider>
        </QueryProvider>
    </BrowserRouter>,
);
