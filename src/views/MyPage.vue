<template>
  <Header></Header>
  <MyPageForm></MyPageForm>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import MyPageForm from '@/components/MyPage.vue'

export default {
  name: 'MyPage',
  components: {
    Header,
    Footer,
    MyPageForm
  }
}
</script>
