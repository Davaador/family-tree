import { authStore, languageStore } from "context/auth/store";
import routes from "pages";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.less";
import i18n from "./i18n";
import { axiosInstance } from "context/interceptors";
import { apiClient } from "context/http";

const router = createBrowserRouter(routes);
axiosInstance(apiClient, authStore);
function App() {
  const { language } = languageStore();
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return <RouterProvider router={router} />;
}

export default App;
