<template>
  <Header v-on:click="clickOutside"></Header>
  <Navigation v-on:click="clickOutside" v-bind:getUser="getUser"></Navigation>
  <Section v-on:click="clickOutside" v-bind:showMenu="showMenu" @toggleMenu="toggleMenu"></Section>
  <Footer v-on:click="clickOutside"></Footer>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'
import Section from '@/components/Section.vue'

export default {
  name: 'HomeView',
  data () {
    return {
      showMenu: false,
    }
  },
  props: ['getUser'],
  components: {
    Header,
    Footer,
    Navigation,
    Section
  }
  ,methods: {
    clickOutside(e) {
      if(e.target.parentNode !== this.$refs.menu) this.showMenu = false;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
}
</script>