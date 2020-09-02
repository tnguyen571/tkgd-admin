import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from '../store/index'
import Home from '../views/Home.vue'
import HeaderBar from '../views/HeaderBar.vue'
import Preview from '../components/Preview.vue'
import ProductManagement from '../components/ProductManagement.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      headerbar: HeaderBar,
      default: Home
    }
  },
  {
    path: '/xem-truoc',
    name: 'preview',
    components: {
      headerbar: HeaderBar,
      default: Preview
    }
  },
  {
    path: '/quan-ly-san-pham',
    name: 'productManagement',
    components: {
      headerbar: HeaderBar,
      default: ProductManagement
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/headerbar',
    name: 'headerbar',
    component: HeaderBar
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const authorize = to.meta
  const isLogin = store.state.login.isLogin

  if (Object.entries(authorize).length !== 0 && authorize.constructor === Object) {
    if (!isLogin) {
      return next({ name: 'login' })
    }
  }

  if (isLogin && to.name === 'login') { return next({ name: 'home' }) }

  next()
})
export default router
