const allRoles = {
  user: ['manageStaff', 'getStaff', 'manageUsers', 'getUsers', 'getRole'],
  admin: ['getUsers', 'manageUsers', 'getStaff', 'getRole'],
};

export const roles: string[] = Object.keys(allRoles); // [ 'user', 'admin', 'staffUser', 'superAdmin' ]
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));

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
