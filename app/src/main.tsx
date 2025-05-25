import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeProvider from "./app/theme/index.tsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import DateContextProvider from "./app/context/data-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ThemeProvider>
      <BrowserRouter>
        <HelmetProvider>
          <DateContextProvider>
            <App />
          </DateContextProvider>
        </HelmetProvider>
      </BrowserRouter>
    </ThemeProvider>
  </>
);
