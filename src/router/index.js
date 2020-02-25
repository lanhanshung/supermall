import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)


// 路由懒加载
const Home=()=>import('../views/home/Home.vue')
const Category=()=>import('../views/category/Category')
const ShopCar=()=>import('../views/shopCar/ShopCar.vue')
const Profile=()=>import('../views/profile/Profile.vue')
const Detail=()=>import('../views/detail/Detail.vue')


// 配置路由
const routes = [
  {
    // 默认路由
    path: '/',
    name: 'home',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/shopCar',
    name: 'shopCar',
    component: ShopCar
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    name: 'detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
