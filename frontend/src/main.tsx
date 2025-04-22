import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalStyle } from "./styled-global";
import AppRoutes from "./routes/AppRoutes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoutes />
    <GlobalStyle />
  </StrictMode>
);
