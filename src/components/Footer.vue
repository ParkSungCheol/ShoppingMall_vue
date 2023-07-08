<template>
    <footer class="py-5 bg-dark footer">
        <div class="buffer"></div>
        <div class="container"><p class="m-0 text-center text-white">Copyright &copy; JuroSpring Market</p></div>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.py-5 {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}
.buffer {
  height: 4rem !important;
}
</style>
