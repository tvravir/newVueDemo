import { createWebHistory, createRouter } from 'vue-router'
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Posts from './components/pages/Posts';
import About from './components/pages/About';
import singlePost from './components/pages/Single-post';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';



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
                name: 'dashboard',
                component: Dashboard,
                path: '/dashboard',
            },
            {
                name: 'posts',
                component: Posts,
                path: '/posts',
            },
            {
                name: "single-post",
                component: singlePost,
                path: '/posts/:id'
            },
            {
                name: 'about',
                component: About,
                path: '/about',
            },
        ]

    },
    {
        name: 'login',
        component: Login,
        path: '/login',
    },
    {
        name: 'register',
        component: Register,
        path: '/register',
    },
    ]
})



export default router;