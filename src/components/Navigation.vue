<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-lg-5">
          <div class="left_menu">
            <router-link class="btn menubar" to="/">Home</router-link>
            <router-link class="btn menubar" to="/data">Data</router-link>
          </div>
          <div class="right_menu">
            <router-link class="btn btn-outline-dark menubar" v-if="user" to="/cart">
                <i class="bi-cart-fill me-1"></i>
                Cart
                <span class="badge bg-dark text-white ms-1 rounded-pill">{{ cartCount }}</span>
            </router-link>
            <router-link class="btn btn-outline-dark menubar" v-if="!user" to="/login">LogIn</router-link>       
            <button class="btn btn-outline-dark menubar" v-if="user" v-on:click="logout">LogOut</button>  
            <router-link class="btn btn-outline-dark menubar" v-if="user" to="/mypage">MyPage</router-link>
          </div>
      </div>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Navigation',
  data () {
    return {
      user : null,
      cartCount : 0
    }
  },
  props : {
    getUser : Function,
  },
  mounted : function() {
    this.user = this.getUser();
    this.getSearch();
  },
  methods: {
    async getSearch() {
      try {
        const baseURI = 'https://api.jurospring.o-r.kr';
        const axiosInstance = axios.create({
          withCredentials: true,
        });
        const result = await axiosInstance.get(`${baseURI}/` + "selectSearch",
        {
          params : {
            userId : this.user.id
          }
        },
        ).then((result) => {
          this.cartCount = result.data.length;
        });
      } catch(e) {
        console.log(e);
      } finally {
      }
    },
    logout: async function(event) {
      event.stopPropagation();
      event.preventDefault();

      const baseURI = 'https://api.jurospring.o-r.kr';
      try{
        const axiosInstance = axios.create({
          withCredentials: true,
        });
        const result = await axiosInstance.get(`${baseURI}/logout`,
        ).then(res => {
          console.log(res);
          return res;
        });

        if(result.status === 200){
          alert("로그아웃 하셨습니다.");
          this.$router.go();
        } else {
          alert("로그아웃에 실패하였습니다.");
        }

      } catch(err){
        console.log(err);
        alert("로그아웃에 실패하였습니다.");
      }
    }
  }
}
</script>

<style scoped>
nav {
  padding: 5px 0px !important;
}
.left_menu {
  width: 40%;
  display: flex;
  justify-content: flex-start;
}
.right_menu {
  width: 60%;
  display: flex;
  justify-content: flex-end;
}
.menubar {
  margin-left: 2%;
}
</style>