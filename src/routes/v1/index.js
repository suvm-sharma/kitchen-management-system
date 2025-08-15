import express, { Router } from 'express';
import authRoute from './auth.route.js';
import docsRoute from './swagger.route.js';
import userRoute from './user.route.js';
import config from '../../config/config.js';
import menuCategoriesRoute from './menuCategories.route.js';
import menuRoute from './menu.route.js';
import staffRoute from './staff.route.js';
import roleRoute from './role.route.js';
import restaurantRoute from './restaurant.route.js';
import menuIngredientsRoute from './menuIngredients.route.js';
import staffAuthRoute from './staffAuth.route.js';

const router = express.Router();

const defaultIRoute = [
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

const devIRoute = [
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
