import Vue from 'vue';
import Router from 'vue-router';
import data from '@/components/data';
import expandImages from '@/components/expandImages';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/data',
      name: 'data',
      component: data
    },
    {
      path: '/expandImages',
      name: 'expandImages',
      component: expandImages
    }
  ]
});
