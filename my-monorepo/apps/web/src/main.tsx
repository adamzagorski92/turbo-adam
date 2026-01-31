import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@my-monorepo/styles/global.css";
import App from "./features/App/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
