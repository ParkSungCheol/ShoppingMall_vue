<template>
    <div>
      <Header></Header>
      <Navigation v-bind:getUser="getUser"></Navigation>
      <NotFound></NotFound>
      <Footer></Footer>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import NotFound from '@/components/NotFound.vue'
  import Navigation from '@/components/Navigation.vue'
  
  export default {
    name: 'NotFound',
    //router 의 getUser function
    props : {
    getUser : Function,
    },
    components: {
      Header,
      Footer,
      NotFound,
      Navigation
    },
  }
  </script>