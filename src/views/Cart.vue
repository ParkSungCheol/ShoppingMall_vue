<template>
  <Header></Header>
  <Navigation v-bind:getUser="getUser"></Navigation>
  <Cart v-bind:getUser="getUser"></Cart>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'
import Cart from '@/components/Cart.vue'

export default {
  name: 'Cart',
  components: {
    Header,
    Footer,
    Navigation,
    Cart
  },
  //router 의 getUser function
  props : {
    getUser : Function,
  },
}
</script>