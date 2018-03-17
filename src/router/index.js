import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
    	path: '/signup',
    	name: 'Signup',
    	component: Signup
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
