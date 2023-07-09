<template>
  <Header></Header>
  <Navigation v-bind:getUser="getUser"></Navigation>
  <Data></Data>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'
import Data from '@/components/Data.vue'

export default {
  name: 'Data',
  //router 의 getUser function
  props : {
    getUser : Function,
  },
  components: {
    Header,
    Footer,
    Navigation,
    Data
  },
};
</script>