<template>
  <Header></Header>
  <Navigation v-bind:getUser="getUser"></Navigation>
  <MyPageForm v-bind:getUser="getUser"></MyPageForm>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import MyPageForm from '@/components/MyPage.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'MyPage',
  //router 의 getUser function
  props : {
    getUser : Function,
  },
  components: {
    Navigation,
    Header,
    Footer,
    MyPageForm
  },
}
</script>
