const allRoles = {
  user: ['getUsers', 'manageUsers', 'manageStaff'],
  superAdmin: [
    'manageMenu',
    'getMenu',
    'getMenuCategories',
    'manageMenuCategories',
    'menuIngredients',
    'getMenuIngredients',
    'manageRestaurant',
    'getRestaurant',
    'getRole',
    'manageRole',
    'manageStaff',
    'getStaff',
  ],
};

export const roles = Object.keys(allRoles); // [ 'user', 'admin', 'staffUser', 'superAdmin' ]
export const roleRights = new Map(Object.entries(allRoles));

/* roleRights:- 
  'user' => [ 'getUsers', 'manageUsers', 'manageStaff' ],
  'admin' => [ 'getUsers', 'manageUsers' ],
}
*/

/*
{
  "title": "superAdmin",
  "permission": [
    "manageMenu",
    "getMenu",
    "getMenuCategories",
    "manageMenuCategories",
    "menuIngredients",
    "getMenuIngredients",
    "manageRestaurant",
    "getRestaurant",
    "getRole",
    "manageRole",
    "manageStaff",
    "getStaff"
  ],
  "description": "...",
  "reportsTo": "...",
  "__v": 0
}
*/
