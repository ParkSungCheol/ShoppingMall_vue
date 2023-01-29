<template>
  <div class="hello">
    <button v-on="testAxios">AxiosTest</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello New World',
      posts: []
    }
  },
  methods: {
    testAxios: function() {
      const baseURI = 'http://ec2-3-39-250-156.ap-northeast-2.compute.amazonaws.com:8080';
      this.$http.get(`${baseURI}/data`)
        .then((result) => {
          console.log(result);
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
