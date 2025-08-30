import { authStore, languageStore } from 'context/auth/store';
import { apiClient } from 'context/http';
import { axiosInstance } from 'context/interceptors';
import routes from 'pages';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.less';
import i18n from './i18n';
import { App as MyApp } from 'antd';
import { GlobalLoading } from 'layouts/GlobalLoading';

// Suppress React Router v7 warning
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0] &&
    typeof args[0] === 'string' &&
    args[0].includes('React Router Future Flag Warning')
  ) {
    return;
  }
  originalWarn.apply(console, args);
};

axiosInstance(apiClient, authStore);
const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
  },
});
function App() {
  const { language } = languageStore();
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <MyApp>
      <GlobalLoading />
      <RouterProvider router={router} />
    </MyApp>
  );
}

export default App;

//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
//docker-compose up -d --build springboot-app
//docker exec -it spring-app sh
