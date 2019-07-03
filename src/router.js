import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path:'/',
        name:'login-root',
        component: Login
    },{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: () => import('./views/Privacy.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
        path: '/weather',
        name: 'weather',
        component: () => import('./views/Weather.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/webcams',
        name: 'webcams',
        component: () => import('./views/Webcams.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/photos',
        name: 'photos',
        component: () => import('./views/Photos.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/logs',
        name: 'logs',
        component: () => import('./views/Logs.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('./views/Test.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/animals',
        name: 'animals',
        component: () => import('./views/Animals.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/quotes',
        name: 'quotes',
        component: () => import('./views/Quotes.vue'),
        meta: {
            requiresAuth: true
        }
    }
  ]
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('home');
    else next();
});

export default router;

