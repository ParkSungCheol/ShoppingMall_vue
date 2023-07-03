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
    props: { getUser : getUser }
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
    meta: { requireLogin: true, notRequireLogin: false, },
    props: { getUser : getUser }
  },
  {
    path: '/data',
    name: 'data',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Data.vue'),
    meta: { requireLogin: true, notRequireLogin: false, },
    props: { getUser : getUser }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: { requireLogin: false, notRequireLogin: true, },
    props: { getUser : getUser }
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
    meta: { requireLogin: false, notRequireLogin: true, },
    props: { getUser : getUser }
  },
  {
    path: '/mypage',
    name: 'mypage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MyPage.vue'),
    meta: { requireLogin: true, notRequireLogin: false, },
    props: { getUser : getUser }
  },
  {
    path: "/404",
    name: "notFound",
    component: NotFoundComponent,
    meta: { requireLogin: false, notRequireLogin: false, },
    props: { getUser : getUser }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/404",
    meta: { requireLogin: false, notRequireLogin: false, },
    props: { getUser : getUser }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

var user;

function getUser() {
  return user;
}

router.beforeEach(async (to, from, next) => {
	console.log(to);
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
      }).catch(error => {
        if (error.response && error.response.status === 303) {
          console.log("세션 없음. 로그인이 필요합니다.");
          // 추가적인 작업 수행 가능
        } else {
          console.error(error);
        }
      });

      if(result.status === 200){
        user = result.data;
        if(to.meta.notRequireLogin) {
          alert("이미 로그인하셨습니다.");
          next('/');
        }
        else {
          next();
        }
      }
      else {
        user = null;
        if(to.meta.requireLogin) {
          alert("로그인이 필요합니다.");
          next('/login');
        }
        else {
          next();
        }
      }
    } catch(err){
      user = null;
      if(to.meta.requireLogin) {
        alert("로그인이 필요합니다.");
        next('/login');
      }
      else {
        next();
      }
    }
});

export default router
