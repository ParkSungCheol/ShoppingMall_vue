<template>
  <div>
    <Header></Header>
    <Navigation v-bind:getUser="getUser"></Navigation>
    <Data></Data>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'
import Data from '@/components/Data.vue'

export default {
  name: 'Data',
  components: {
    Header,
    Footer,
    Navigation,
    Data
  },
  //router 의 getUser function
  props : {
    getUser : Function,
  },
};
</script>