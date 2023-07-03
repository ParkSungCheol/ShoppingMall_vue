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
  props : {
    getUser : Function,
  },
  mounted : function() {
    this.user = this.getUser();
  },
  components: {
    Navigation,
    Header,
    Footer,
    LoginForm
  },
  data() {
    return {
      user: null,
    }
  },
}
</script>
