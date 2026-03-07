// features/App/router.tsx
import { createBrowserRouter } from "react-router";
import MainLayout from "../../leyouts/MainLayout/MainLayout";
import HomePage from "../HomePage/HomePage";

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [{ index: true, Component: HomePage }],
  },
]);
