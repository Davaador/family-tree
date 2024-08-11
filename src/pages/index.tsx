import { RouteObject } from "react-router-dom";
import publicRoutes from "./public";
import privateRoute from "./private";

const routes: RouteObject[] = [privateRoute,...publicRoutes];

export default routes;