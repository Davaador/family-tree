import {RouteObject} from "react-router-dom";
import Login from "./Login";

const authRoutes: RouteObject= {
    path: "auth",
    children: [
        {
            path: "login",
            element: <Login/>
        }
    ]
};

export  default  authRoutes;