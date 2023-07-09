<template>
  <Header></Header>
  <Navigation v-bind:getUser="getUser"></Navigation>
  <LoginForm></LoginForm>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LoginForm from '@/components/Login.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Login',
  //router 의 getUser function
  props : {
    getUser : Function,
  },
  components: {
    Navigation,
    Header,
    Footer,
    LoginForm
  },
}
</script>
