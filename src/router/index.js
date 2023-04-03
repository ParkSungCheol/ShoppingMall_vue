import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundComponent from '../components/NotFound.vue'
import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requireLogin: false }
  },
  {
    path: '/detail',
    name: 'detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DetailView.vue'),
    meta: { requireLogin: true }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: { requireLogin: false }
  },
  {
    path: "/404",
    name: "notFound",
    component: NotFoundComponent,
    meta: { requireLogin: false }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/404",
    meta: { requireLogin: false }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
	console.log(to);
	if (to.meta.requireLogin) {
		const baseURI = 'https://api.jurospring.o-r.kr';
      try{
        const axiosInstance = axios.create({
          withCredentials: true,
        });
        const result = await axiosInstance.get(`${baseURI}/getSession`,
        {},
        ).then(res => {
          console.log(res);
        });

        console.log(result);
        if(result.status === 200){
          next();
        }
        else {
          alert("로그인이 필요합니다.");
          next('/login');
        }

      } catch(err){
        console.log(err);
        alert("로그인이 필요합니다.");
        next('/login');
      }
	} else {
		next();
	}
});

export default router
