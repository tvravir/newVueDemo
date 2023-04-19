import { createWebHistory, createRouter } from 'vue-router'
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Products from './components/pages/Products';
import Table from './components/pages/Table';
import NotFound from './components/pages/Not-found';
import productDetail from './components/pages/Product-detail';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Calendar from './components/pages/Calendar'
import UserList from '@/components/pages/user-list/index.vue'

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem('currentuser'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  }
  else {
    next('/login'); // go to '/login';
  }
}
const router = createRouter({
  history: createWebHistory(),
  routes: [{
    name: 'home',
    path: '/',
    component: Home,
    beforeEnter: guardMyroute,
    redirect: 'dashboard',
    // sensitive: true,
    // redirect: 'login'
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
      },
      {
        path: '/products',
        name: 'Products',
        component: Products,

      },
      {
        path: '/products/:id',
        name: "Product-details",
        component: productDetail,
      },
      {
        path: '/table',
        name: 'table',
        component: Table,
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: Calendar,
      },
      {
        path: '/user-list',
        name: 'userList',
        component: UserList,
      },
    ]

  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
  ]
})



export default router;