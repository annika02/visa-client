// routes.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import AllVisas from "../pages/AllVisas";
import VisaDetails from "../pages/VisaDetails";
import MyApplications from "../pages/MyApplications";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />, // Add error page here
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/all-visas",
        element: <AllVisas></AllVisas>,
      },
      {
        path: "/visa/:id",
        element: <VisaDetails></VisaDetails>,
      },
      {
        path: "/my-applications",
        element: <MyApplications></MyApplications>,
      },
    ],
  },
]);
