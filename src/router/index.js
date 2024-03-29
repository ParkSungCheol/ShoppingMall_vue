import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundComponent from '../views/NotFound.vue'
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
    // lazy-loading
    component: () => import('../views/Cart.vue'),
    meta: { requireLogin: true, notRequireLogin: false, },
    props: { getUser : getUser }
  },
  {
    path: '/data',
    name: 'data',
    component: () => import('../views/Data.vue'),
    meta: { requireLogin: true, notRequireLogin: false, },
    props: { getUser : getUser }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { requireLogin: false, notRequireLogin: true, },
    props: { getUser : getUser }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue'),
    meta: { requireLogin: false, notRequireLogin: true, },
    props: { getUser : getUser }
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('../views/MyPage.vue'),
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
  window.scrollTo(0,0);

  // 세션 검증을 통한 로그인 검증절차 requireLogin : 로그인이 필요한 화면 / notRequireLogin : 로그인 되어있으면 접근불가능한 화면
  const baseURI = 'https://api.jurospring.o-r.kr';
    try{
      const axiosInstance = axios.create({
        withCredentials: true,
      });
      const result = await axiosInstance.get(`${baseURI}/getSession`,
      {},
      ).then(res => {
        return res;
      }).catch(error => {
        if (error.response && error.response.status === 303) {
          console.log("로그인이 필요합니다.");
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
