import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import { router } from "./router";
import i18n from "../../i18n/config";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </I18nextProvider>
  );
}

export default App;
