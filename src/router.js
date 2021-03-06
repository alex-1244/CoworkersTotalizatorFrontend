import Vue from 'vue';
import Router from 'vue-router';
import Coworkers from '@/views/Coworkers.vue';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Coworkers',
      component: Coworkers,
    },
    {
      path: '/lotteries',
      name: 'lotteries',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Lotteries.vue'),
    },
    {
      path: '/userbids',
      name: 'userbids',
      component: () => import('./views/UserBids.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/usersBids/:lotteryId',
      name: 'usersBidsAdmin',
      component: () => import('./views/UsersBidsAdmin.vue'),
      props: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (store.state.token || to.name === 'login') {
    next();

    return;
  }

  // next();
  next({ name: 'login' });
});

export default router;
