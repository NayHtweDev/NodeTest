import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/Home.vue')
   },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/Signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/parent-products',
    name: 'parent-products',
    component: () => import('../components/Parent/Index.vue')
  },
  {
    path: '/parent-products/create',
    name: 'parent-product-create',
    component: () => import('../components/Parent/Create.vue')
  },
  {
    path: '/parent-products/edit/:id',
    name: 'parent-product-edit',
    component: () => import('../components/Parent/Edit.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../components/Product/Index.vue')
  },
  {
    path: '/products/create',
    name: 'product-create',
    component: () => import('../components/Product/Create.vue')
  },
  {
    path: '/products/edit/:id',
    name: 'product-edit',
    component: () => import('../components/Product/Edit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router