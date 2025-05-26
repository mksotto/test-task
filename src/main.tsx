import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {AdaptivityProvider, AppRoot, ConfigProvider} from "@vkontakte/vkui";
import './index.css';
import {App} from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ConfigProvider colorScheme='light'>
          <AdaptivityProvider>
              <AppRoot>
                  <App />
              </AppRoot>
          </AdaptivityProvider>
      </ConfigProvider>,
  </StrictMode>,
)
