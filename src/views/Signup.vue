<template>
  <Header></Header>
  <Navigation v-bind:getUser="getUser"></Navigation>
  <SignupForm></SignupForm>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SignupForm from '@/components/Signup.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'SignUp',
  //router 의 getUser function
  props : {
    getUser : Function,
  },
  components: {
    Navigation,
    Header,
    Footer,
    SignupForm
  },
}
</script>
