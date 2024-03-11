import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import Routes from "./routes/index.tsx";
import "./global.css";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <Notifications position="top-right" zIndex={2077} />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </MantineProvider>
);
