<template>
  <Header v-on:click="clickOutside"></Header>
  <Navigation v-on:click="clickOutside" v-bind:loginSuccess="loginSuccess"></Navigation>
  <Section v-on:click="clickOutside" v-bind:showMenu="showMenu" @toggleMenu="toggleMenu"></Section>
  <Footer v-on:click="clickOutside"></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'
import Section from '@/components/Section.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  data () {
    return {
      showMenu: false,
      loginSuccess:false,
    }
  },
  components: {
    Header,
    Footer,
    Navigation,
    Section
  },
  mounted() {
    this.getSession();
  }
  ,methods: {
    async getSession() {
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
        if(result.status === 200){
          this.loginSuccess = true;
        }
        else {
          this.loginSuccess = false;
        }

      } catch(err){
        console.log(err);
        this.loginSuccess = false;
      }
    },
    clickOutside(e) {
      if(e.target.parentNode !== this.$refs.menu) this.showMenu = false;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
}
</script>