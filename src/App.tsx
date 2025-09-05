import { App as MyApp, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { authStore, languageStore } from 'context/auth/store';
import { apiClient } from 'context/http';
import { axiosInstance } from 'context/interceptors';
import { GlobalLoading } from 'layouts/GlobalLoading';
import routes from 'pages';

import ErrorBoundary from './components/ErrorBoundary';
import i18n from './i18n';
import './App.less';

// Suppress React Router v7 warning
// eslint-disable-next-line no-console
const originalWarn = console.warn;
// eslint-disable-next-line no-console
console.warn = (...args) => {
  if (
    args[0] &&
    typeof args[0] === 'string' &&
    args[0].includes('React Router Future Flag Warning')
  ) {
    return;
  }
  // eslint-disable-next-line no-console
  originalWarn.apply(console, args);
};

axiosInstance(apiClient, authStore);
const router = createBrowserRouter(routes);
function App() {
  const { language } = languageStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(language);
    // Set ready after a short delay to ensure proper hydration
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [language]);

  if (!isReady) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size='large' />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <MyApp>
        <GlobalLoading />
        <RouterProvider router={router} />
      </MyApp>
    </ErrorBoundary>
  );
}

export default App;
