<template>
  <Header></Header>
  <Navigation v-bind:getUser="getUser"></Navigation>
  <CartForm v-bind:getUser="getUser"></CartForm>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'
import CartForm from '@/components/Cart.vue'

export default {
  name: 'Cart',
  //router 의 getUser function
  props : {
    getUser : Function,
  },
  components: {
    Header,
    Footer,
    Navigation,
    CartForm
  },
}
</script>