<template>
  <Header></Header>
  <Navigation></Navigation>
  <h1>상세 페이지 입니다. 권한검증이 완료되었습니다.</h1>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'DatailView',
  components: {
    Header,
    Footer,
    Navigation
  }
}
</script>
