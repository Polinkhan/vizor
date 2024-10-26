import "./App.css";
import { SnackbarProvider } from "notistack";
import RootRouter from "./app/routes/router/RootRouter";
import Suspense from "./app/components/handler/Suspense";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <SnackbarProvider maxSnack={5} autoHideDuration={5000}>
      <Suspense>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RootRouter />
        </LocalizationProvider>
      </Suspense>
    </SnackbarProvider>
  );
}

export default App;
