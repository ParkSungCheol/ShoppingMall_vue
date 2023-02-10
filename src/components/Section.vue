<template>
  <section class="py-5">
      <div class="container px-4 px-lg-5 mt-5">
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              <good v-for="item in goods"></good>
          </div>
      </div>
  </section>
</template>

<script>
import axios from 'axios'
import good from './good.vue'

export default {
  name: 'Section',
  data () {
    return {
        goods : []
    }
  },
  components: {
    good
  },
  mounted() {
    this.getGoods();
  }
  ,methods: {
    getGoods() {
        const baseURI = 'https://www.jurospring.o-r.kr';
        axios.get(`${baseURI}/data`)
        .then((result) => {
            this.goods = result.data;
        });
    }
  }
}
</script>
