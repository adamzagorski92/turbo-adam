import { RouterProvider } from "react-router";
import { router } from "@features/App/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
