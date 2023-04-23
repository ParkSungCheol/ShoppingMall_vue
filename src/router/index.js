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
    props: { user: user }
  },
  {
    path: '/detail',
    name: 'detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DetailView.vue'),
    meta: { requireLogin: true, notRequireLogin: false, },
    props: { user: user }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: { requireLogin: false, notRequireLogin: true, },
    props: { user: user }
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
    meta: { requireLogin: false, notRequireLogin: true, },
    props: { user: user }
  },
  {
    path: '/mypage',
    name: 'mypage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MyPage.vue'),
    meta: { requireLogin: true, notRequireLogin: false, },
    props: { user: user }
  },
  {
    path: "/404",
    name: "notFound",
    component: NotFoundComponent,
    meta: { requireLogin: false, notRequireLogin: false, },
    props: { user: user }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/404",
    meta: { requireLogin: false, notRequireLogin: false, },
    props: { user: user }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

var user;

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
          user = result.data;
          next();
        }
        else if(result.status === 200 && to.meta.notRequireLogin) {
          user = result.data;
          alert("이미 로그인하셨습니다.");
          next('/');
        }
        else if(to.meta.requireLogin) {
          user = null;
          alert("로그인이 필요합니다.");
          next('/login');
        }
        else if(to.meta.notRequireLogin) {
          user = null;
          next();
        }

      } catch(err){
        console.log(err);
        if(to.meta.requireLogin) {
          user = null;
          alert("로그인이 필요합니다.");
          next('/login');
        }
        else if(to.meta.notRequireLogin) {
          user = null;
          next();
        }
      }
	} else {
    user = null;
		next();
	}
});

export default router
