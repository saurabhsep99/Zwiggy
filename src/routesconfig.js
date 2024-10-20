// routesConfig.js

import React from 'react';

// Lazy load all the pages
const Home = React.lazy(() => import('./pages/Home.jsx'));
const Restaurants = React.lazy(() => import('./pages/Restaurants.jsx'));
const RestaurantDetail = React.lazy(() => import('./pages/RestaurantDetails.jsx'));
const Login = React.lazy(() => import('./pages/Login.jsx'));
const Register = React.lazy(() => import('./pages/Register.jsx'));
const AddRestaurantForm = React.lazy(() => import('./components/addRestaurant.jsx'));

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/restaurants',
    component: Restaurants,
  },
  {
    path: '/restaurants/:id',
    component: RestaurantDetail,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/add_restaurant',
    component: AddRestaurantForm,
  },
];

export default routes;
