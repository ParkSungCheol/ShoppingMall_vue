<template>
  <Navigation v-on:click="clickOutside"/>
  <Header v-on:click="clickOutside"/>
  <Section v-on:click="clickOutside" v-bind:showMenu="showMenu" @toggleMenu="toggleMenu"/>
  <Footer v-on:click="clickOutside"/>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Header from './components/Header.vue'
import Section from './components/Section.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  data () {
    return {
      showMenu: false
    }
  },
  components: {
    Navigation,
    Header,
    Section,
    Footer
  },
  methods: {
    clickOutside(e) {
      if(e.target.parentNode !== this.$refs.menu) this.showMenu = false;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@import "../css/styles.css";

</style>
