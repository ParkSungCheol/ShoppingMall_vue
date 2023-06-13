<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-lg-5">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                  <li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">Home</a></li>
                  <li class="nav-item"><a class="nav-link" href="#!">About</a></li>
                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li><a class="dropdown-item" href="#!">All Products</a></li>
                          <li><hr class="dropdown-divider" /></li>
                          <li><a class="dropdown-item" href="#!">Popular Items</a></li>
                          <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
                      </ul>
                  </li>
              </ul>
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
      cartCount : 0,
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
          console.log(result);
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
.right_menu {
  width: 82%;
  display: flex;
  justify-content: flex-end;
}
.right_menu .menubar {
  margin-left: 2%;
}
</style>