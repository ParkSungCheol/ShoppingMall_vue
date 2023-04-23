<template>
  <Header></Header>
  <MyPageForm v-bind:getUser="getUser"></MyPageForm>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import MyPageForm from '@/components/MyPage.vue'

export default {
  name: 'MyPage',
  props: ['getUser'],
  components: {
    Header,
    Footer,
    MyPageForm
  }
}
</script>
