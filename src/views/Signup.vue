<template>
  <Header></Header>
  <SignupForm></SignupForm>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SignupForm from '@/components/Signup.vue'

export default {
  name: 'Login',
  components: {
    Header,
    Footer,
    SignupForm
  }
}
</script>
