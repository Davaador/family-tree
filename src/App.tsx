import { authStore, languageStore } from 'context/auth/store';
import { apiClient } from 'context/http';
import { axiosInstance } from 'context/interceptors';
import routes from 'pages';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.less';
import i18n from './i18n';
import { App as MyApp } from 'antd';

axiosInstance(apiClient, authStore);
const router = createBrowserRouter(routes);
function App() {
  const { language } = languageStore();
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <MyApp>
      <RouterProvider router={router} />
    </MyApp>
  );
}

export default App;
