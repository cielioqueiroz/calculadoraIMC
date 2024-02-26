import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Calculator from "../pages/Calculator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/calculator",
    element: <Calculator />,
  },
]);

export default router;
