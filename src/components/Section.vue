<template>
  <section class="py-5">
      <div class="container px-4 px-lg-5 mt-5">
          <form class="d-flex" style="margin-bottom:50px">
            <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" v-model="search"/>
            <div class="btn-group sort-btn">
            <button v-on:click='toggleShow' class="btn btn-primary" style="width:80px">{{ sortMsg }}</button>
            <button class="btn btn-primary" data-sort="none" v-on:click="sorting"><i class="fa fa-sort" ref="toggle"></i></button><!-- .dropdown-toggle adds rounded borders and reduces padding. It does not trigger dropdowns. -->
            <ul v-if="showMenu" class='dropdown-menu' style="margin-top:40px; display: inline-block;" ref="menu">
              <option v-for='sort in sorts' href="#" tabindex="-1" data-type="alpha" v-on:click="selectSort" :value="sort">{{ sort }}</option>
            </ul>
            </div>
          </form>
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <ul v-for="item in filteredList">
                <div class="col mb-5">
                    <div class="card h-100">
                        <!-- Product image-->
                        <img class="card-img-top" :src="item.image? item.image : 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'" alt="..." />
                        <!-- Product details-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">{{ item.name }}</h5>
                                <!-- Product price-->
                                <h5 class="fw-bolder" style="color:red">{{ numberWithCommas(item.price) + "원" }}</h5>
                                <svg width="15" height="12" fill="none" xmlns="http://www.w3.org/2000/svg" class="price_svg_delivery__kOiSU"></svg>
                            </div>
                        </div>
                        <!-- Product actions-->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" :href= "item.detail" onclick="window.open(this.href, '_blank'); return false;">상세페이지</a></div>
                        </div>
                    </div>
                </div>
            </ul>
          </div>
      </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Section',
  data () {
    return {
      search: '',
      goods : [],
      sortDir : '',
      sortMsg : 'Sort',
      sorts : ['Name', 'Price'],
    }
  },
  props: {
    showMenu: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.getGoods();
  }
  ,methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getGoods() {
      const baseURI = 'https://api.jurospring.o-r.kr';
      axios.get(`${baseURI}/goods`)
      .then((result) => {
        console.log(result);
        this.goods = result.data;
      });
    },
    sorting(event) {
      event.stopPropagation();
      event.preventDefault();

      if(this.sortDir !== 'asc') {
        this.sortDir = 'asc';
      }
      else {
        this.sortDir = 'desc';
      }

      this.$refs['toggle'].classList = ['fa fa-sort-' + this.sortDir];

      if(this.sortMsg == "Name" && this.sortDir != '') {
        this.goods = this.goods.sort((a, b) => {
          if(this.sortDir == "asc") 
            return a.name.localeCompare(b.name)
          return b.name.localeCompare(a.name)
        });
      }
      else if(this.sortMsg == "Price" && this.sortDir != '') {
        this.goods = this.goods.sort((a, b) => {
          if(this.sortDir == "asc") 
            return a.price - b.price
          return b.price - a.price
        });
      }
    },
    toggleShow(event) {
      event.stopPropagation();
      event.preventDefault();
      this.$emit("toggleMenu");
    },
    selectSort(e) {
      this.sortMsg = e.target.value;
      this.sortDir = '';
      this.$refs['toggle'].classList = ['fa fa-sort'];
    }
  }
  ,computed: {
    filteredList() {
      return this.goods.filter(good => {
        return good.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style scoped>
option {
  text-decoration: none !important;
  display: block !important;
  padding-left: 10px;
  cursor: pointer;
}
.dropdown-menu>li>a:focus, .dropdown-menu>option:hover {
    color: #262626;
    text-decoration: none;
    background-color: #f5f5f5;
    border: red solid 1px;
}
</style>
