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
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (store.state.token || to.name === 'login') {
    next();

    return;
  }

  next();
  // next({ name: 'login' });
});

export default router;
