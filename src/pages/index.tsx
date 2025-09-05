import { RouteObject } from 'react-router-dom';

import privateRoute from './private';
import publicRoutes from './public';

const routes: RouteObject[] = [privateRoute, ...publicRoutes];

export default routes;
