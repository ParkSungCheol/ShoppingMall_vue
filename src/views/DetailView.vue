<template>
  <Header></Header>
  <Navigation></Navigation>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer,
    Navigation
  }
}
</script>
