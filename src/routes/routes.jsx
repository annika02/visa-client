// routes.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import AllVisas from "../pages/AllVisas";
import VisaDetails from "../pages/VisaDetails";
import MyApplications from "../pages/MyApplications";
import AddVisa from "../pages/AddVisa";
import Home from "../pages/Home";
import MyVisas from "../pages/MyVisas";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/my-visas",
        element: <MyVisas></MyVisas>,
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
        path: "/add-visa",
        element: <AddVisa></AddVisa>,
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
