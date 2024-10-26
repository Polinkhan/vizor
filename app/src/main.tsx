import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeProvider from "./app/theme/index.tsx";
import { HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ThemeProvider>
      <HashRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </HashRouter>
    </ThemeProvider>
  </>
);
