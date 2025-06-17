import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <BrowserRouter basename="/AdminPanel/">
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
