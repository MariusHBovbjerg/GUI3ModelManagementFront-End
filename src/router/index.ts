import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/forms/LoginForm.vue')
  },

  {
    path: '/changepass',
    name: 'ChangePass',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/forms/ChangePasswordForm.vue')
  },

  {
    path: '/manager',
    name: 'Manager',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/ManagerComponent.vue'),
    beforeEnter: (to, from, next) => {
      if (to.path == '/manager') {
        if (localStorage.getItem('claim') == 'Manager') {
          next();
          return;
        }
      next('/');
      }
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
