import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {AdaptivityProvider, AppRoot, ConfigProvider} from "@vkontakte/vkui";
import './index.css';
import {App} from './App.tsx';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider colorScheme='light'>
                <AdaptivityProvider>
                    <AppRoot>
                        <App />
                    </AppRoot>
                </AdaptivityProvider>
            </ConfigProvider>
        </QueryClientProvider>
    </StrictMode>
);
