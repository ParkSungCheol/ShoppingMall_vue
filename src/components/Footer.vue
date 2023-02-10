<template>
    <footer class="py-5 bg-dark">
        <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2022</p></div>
        <p>test..</p>
        <button v-on:click="testAxios">AxiosTest</button>
    </footer>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Footer',
  data () {
    return {}
  },
  methods: {
    testAxios: function() {
      const baseURI = 'https://www.jurospring.o-r.kr';
      axios.get(`${baseURI}/data`)
        .then((result) => {
          console.log(result);
        })
    }
  }
}
</script>
