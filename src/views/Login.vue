<template>
  <Header></Header>
  <LoginForm></LoginForm>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LoginForm from '@/components/Login.vue'

export default {
  name: 'Login',
  components: {
    Header,
    Footer,
    LoginForm
  }
}
</script>
