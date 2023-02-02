<template>
  <Navigation/>
  <Header/>
  <Section/>
  <Footer/>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Header from './components/Header.vue'
import Section from './components/Section.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    Header,
    Section,
    Footer
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
