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
      const baseURI = 'http://ec2-3-39-250-156.ap-northeast-2.compute.amazonaws.com:8080';
      axios.get(`${baseURI}/data`)
        .then((result) => {
          console.log(result);
        })
    }
  }
}
</script>
