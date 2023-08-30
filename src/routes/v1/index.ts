import express, { Router } from 'express';
import authRoute from './auth.route';
import docsRoute from './swagger.route';
import userRoute from './user.route';
import config from '../../config/config';
import menuCategoriesRoute from './menuCategories.route';
import menuRoute from './menu.route';
import staffRoute from './staff.route';
import roleRoute from './role.route';
import restaurantRoute from './restaurant.route';
import menuIngredientsRoute from './menuIngredients.route';
import staffAuthRoute from './staffAuth.route';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/menuCategories',
    route: menuCategoriesRoute,
  },
  {
    path: '/menu',
    route: menuRoute,
  },
  {
    path: '/staff',
    route: staffRoute,
  },
  {
    path: '/role',
    route: roleRoute,
  },
  {
    path: '/restaurant',
    route: restaurantRoute,
  },
  {
    path: '/menuIngredients',
    route: menuIngredientsRoute,
  },
  {
    path: '/staffAuth',
    route: staffAuthRoute,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
