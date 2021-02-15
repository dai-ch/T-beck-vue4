import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import firebase from 'firebase';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    meta: { requiresAuth: true },
    component: () => import('../views/Users.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    // ログインされているかどうか認証が必要
    // もしされていないならば、ログインページにリダイレクト
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        next();
      } else {
        next({
          path: '/users',
          query: { redirect: to.fullPath },
        });
      }
    });
  } else {
    // next() がログインページ（現在表示されてるページへリダイレクトさせる機能？）
    next();
  }
});

export default router;
