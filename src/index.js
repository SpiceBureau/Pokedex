import './css/index.css';
import ErrorPage from './components/ErrorPage';
import InfoScreen from './components/info_Screen/InfoScreen';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainScreen from './components/main_Screen/MainScreen';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainScreen />,
    errorElement: <ErrorPage />
  },
  {
    path: "/infoScreen/:name",
    element: <InfoScreen />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
