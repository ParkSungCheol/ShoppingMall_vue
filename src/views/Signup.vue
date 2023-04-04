<template>
  <Header></Header>
  <h1>회원가입 만드세요!</h1>
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
