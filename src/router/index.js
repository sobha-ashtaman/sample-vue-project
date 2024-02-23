import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import BookView from '../views/BookView.vue'
import PageNotFoundView from '../views/PageNotFoundView.vue'
import admin from './admin.js';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search/:keyword?',
      name: 'seach',
      component: SearchView
    },
    {
      path: '/book/:id',
      name: 'book-details',
      component: BookView
    },
    ...admin,
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: PageNotFoundView
    }
  ]
});

router.beforeEach((to, from, next) => {
  let isAuthRequest = (typeof to.meta.guest == "undefined" || to.meta.guest)?false:true;
  if(isAuthRequest){
    const auth = useAuthStore();
    if(localStorage.getItem('_token') == null){
      next({
        path: "/admin",
        params: { nextUrl: to.fullPath },
      });
    }
    else{
      if(auth.getUser)
        next();
      else{
        next({
          path: "/admin",
          params: { nextUrl: to.fullPath },
        });
      }
    }
  }
  else
    next();
})

export default router
