import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundComponent from '../components/NotFound.vue'
import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requireLogin: false, notRequireLogin: false, },
  },
  {
    path: '/detail',
    name: 'detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DetailView.vue'),
    meta: { requireLogin: true, notRequireLogin: false, },
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: { requireLogin: false, notRequireLogin: true, },
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
    meta: { requireLogin: false, notRequireLogin: true, },
  },
  {
    path: '/mypage',
    name: 'mypage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MyPage.vue'),
    meta: { requireLogin: true, notRequireLogin: false, },
  },
  {
    path: "/404",
    name: "notFound",
    component: NotFoundComponent,
    meta: { requireLogin: false, notRequireLogin: false, },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/404",
    meta: { requireLogin: false, notRequireLogin: false, },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
	console.log(to);
	if (to.meta.requireLogin || to.meta.notRequireLogin) {
		const baseURI = 'https://api.jurospring.o-r.kr';
      try{
        const axiosInstance = axios.create({
          withCredentials: true,
        });
        const result = await axiosInstance.get(`${baseURI}/getSession`,
        {},
        ).then(res => {
          console.log(res);
          return res;
        });

        console.log(result);
        if(result.status === 200 && to.meta.requireLogin){
          to.query.user = result.data;
          next({query: to.query});
        }
        else if(result.status === 200 && to.meta.notRequireLogin) {
          alert("이미 로그인하셨습니다.");
          to.query.user = result.data;
          next('/', {query: to.query});
        }
        else if(to.meta.requireLogin) {
          alert("로그인이 필요합니다.");
          next('/login');
        }
        else if(to.meta.notRequireLogin) {
          next();
        }

      } catch(err){
        console.log(err);
        if(to.meta.requireLogin) {
          alert("로그인이 필요합니다.");
          next('/login');
        }
        else if(to.meta.notRequireLogin) {
          next();
        }
      }
	} else {
		next();
	}
});

export default router
