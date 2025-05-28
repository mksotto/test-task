import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConfigProvider, App as ApplicationWrapper, ThemeConfig} from "antd";
import localeRU from 'antd/locale/ru_RU';
import {App} from './App.tsx';
import {LayoutWrapper} from "@/components/LayoutWrapper/LayoutWrapper.tsx";
import './index.css';

const queryClient = new QueryClient();

const theme: ThemeConfig = {
    token: {
        colorPrimary: '#07f',
        colorInfo: '#07f',
        borderRadius: 12
    },
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider locale={localeRU} theme={theme}>
                <ApplicationWrapper>
                    <LayoutWrapper>
                        <App />
                    </LayoutWrapper>
                </ApplicationWrapper>
            </ConfigProvider>
        </QueryClientProvider>
    </StrictMode>
);
