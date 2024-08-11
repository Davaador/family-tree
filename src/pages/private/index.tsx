import {RouteObject} from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import ErrorResult from "../../layouts/ErrorResult";
import {authGuard} from "./private.service";
import Dashboard from "./Dashboard";

const privateRoute: RouteObject = {
    path: "/",
    element: <AuthLayout/>,
    errorElement: <ErrorResult/>,
    loader: authGuard,
    children: [
        {
            path: "/",
            element: <Dashboard />
        }
    ]
}

export  default privateRoute;