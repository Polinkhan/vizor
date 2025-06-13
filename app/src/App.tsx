import { SnackbarProvider } from "notistack";
import RootRouter from "./app/routes/router/RootRouter";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
      <RootRouter />
    </SnackbarProvider>
  );
};

export default App;
