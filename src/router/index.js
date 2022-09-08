import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Vendor from '../views/Vendor.vue'
// import Category from '../views/Category.vue'
import Register from '../views/Register.vue'
// import Login from '../views/Login.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Profile from '../views/Profile.vue'
import Parcel from '../views/Parcel.vue'
import Orders from '../views/Orders.vue'
import NotFound from '../views/404.vue'
import Category from '../views/Category.vue'
import OrderDetails from '../views/OrderDetails.vue'
import PackageType from '../components/PackageType.vue'
import PackageParameter from '../components/PackageParameter.vue'
import Summary from '../components/Summary.vue'
import PaymentInfo from '../components/PaymentInfo.vue'
import RecipientInfo from '../components/RecipientInfo.vue'
// import store from "../store"


const guest = (to, from, next) => {
  if (!localStorage.getItem("authToken")) {
    return next();
  } else {
    return next("/");
  }
};


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: '/vendor/:id/:slug',
    name: 'Vendor',
    component: Vendor,
    meta: { guest: true },
  },
  {
    path: '/category/:id/:slug',
    name: 'Category',
    component: Category,
    meta: { guest: true },
  },
  {
    path: '/package-types',
    name: 'packagetype',
    component: PackageType,
  },
  {
    path: '/recipient',
    name: 'recipientInfo',
    component: RecipientInfo,
  },
  {
    path: '/package-parameters',
    name: 'packageparameter',
    component: PackageParameter,
  },
  {
    path: '/summary',
    name: 'summary',
    component: Summary,
  },
  {
    path: '/payments',
    name: 'payment',
    component: PaymentInfo,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { guest: false },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { guest: false },
  },
  {
    path: '/order/details/:id/:slug',
    name: 'OrderDetails',
    component: OrderDetails,
    meta: { guest: false },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { guest: false },
  },
  {
    path: '/product/:id/:slug',
    name: 'Product',
    component: Product,
    meta: { guest: true },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { guest: true },
  },
  {
    path: '/parcel',
    name: 'Parcel',
    component: Parcel,
    meta: { guest: false },
  },
  {
    path: '/register',
    name: "Register",
    component: Register,
    meta: { guest: true },
  },
  {
    path: '/login',
    name: "Login",
    beforeEnter: guest,
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: NotFound,
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (store.getters.isAuthenticated) {
//       next();
//       return;
//     }
//     next("/login");
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.guest)) {
//     if (store.getters.isAuthenticated) {
//       next("/");
//       return;
//     }
//     next();
//   } else {
//     next();
//   }
// });


router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    // eslint-disable-next-line no-undef
    NProgress.start()
  }
  next()
})

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  // eslint-disable-next-line no-undef
  NProgress.done()
})

export default router
