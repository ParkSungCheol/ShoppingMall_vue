<template>
  <Header></Header>
  <Navigation v-bind:getUser="getUser"></Navigation>
  <Section></Section>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'
import Section from '@/components/Section.vue'

export default {
  name: 'HomeView',
  //router 의 getUser function
  props : {
    getUser : Function,
  },
  components: {
    Header,
    Footer,
    Navigation,
    Section
  }
}
</script>