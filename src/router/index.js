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

//routerが実行される前に下記の中の処理が実行
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    //認証状態を取得
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        next();
      } else {
        next({
          // 認証されていない場合、認証画面へ
          path: '/',
        });
      }
    });
  } else {
    next();
  }
});

export default router;
