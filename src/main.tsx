import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConfigProvider, App as ApplicationWrapper} from "antd";
import localeRU from 'antd/locale/ru_RU';
import {App} from './App.tsx';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider locale={localeRU}>
                <ApplicationWrapper>
                    <App />
                </ApplicationWrapper>
            </ConfigProvider>
        </QueryClientProvider>
    </StrictMode>
);
