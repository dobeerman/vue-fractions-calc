import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import FractionsCalc from '@/components/FractionsCalc';
import WebSocket from '@/components/WebSocket';

Vue.use(Router);

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/fraction',
      name: 'FractionsCalc',
      component: FractionsCalc,
    },
    {
      path: '/websocket',
      name: 'WebSocket',
      component: WebSocket,
    },
  ],
});
