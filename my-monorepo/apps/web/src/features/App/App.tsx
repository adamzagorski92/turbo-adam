import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { router } from "@features/App/router";

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
