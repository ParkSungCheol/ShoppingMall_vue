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
                                <h5 class="fw-bolder" style="color:red">{{ numberWithCommas(item.price) }}</h5>
                                <svg width="15" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <mask style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="12">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15 0H0v11.786h15V0z" fill="#fff"></path>
                                  </mask>
                                  <g mask="url(#IconProductDelivery_svg__a)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M.755 9.406c0 .021.022.044.042.044h.734c.174-.879.91-1.54 1.795-1.54.885 0 1.62.661 1.795 1.54H9.88c.174-.879.91-1.54 1.794-1.54s1.621.661 1.795 1.54h.735c.02 0 .041-.023.041-.044V6.289a2.112 2.112 0 0 0-.142-.672l-1.23-2.73c-.007-.058-.208-.192-.259-.174H9.101c-.021 0-.043.023-.043.045v4.37H.755v2.278zm2.571 1.583c.596-.001 1.078-.51 1.08-1.141-.002-.63-.484-1.14-1.08-1.14-.597 0-1.079.51-1.08 1.14.001.63.483 1.14 1.08 1.14zm8.348 0c.597-.002 1.08-.51 1.08-1.141 0-.63-.483-1.14-1.08-1.141-.596.001-1.079.51-1.08 1.141.001.63.484 1.139 1.08 1.14zM0 6.333V.84C.002.376.356.001.796 0h6.14c.44.002.795.375.796.841v.903h-.755V.841c0-.02-.022-.045-.042-.045H.795c-.019 0-.04.023-.04.045v5.492h7.55V2.758c0-.465.355-.84.796-.84h3.513c.41.017.747.243.939.626l1.23 2.73c.13.302.212.683.217 1.015v3.117c-.002.465-.355.838-.796.84h-.735c-.173.879-.91 1.539-1.795 1.539-.884 0-1.62-.66-1.795-1.54H5.121c-.174.88-.911 1.54-1.795 1.54-.885 0-1.621-.66-1.795-1.54H.797c-.441 0-.795-.374-.797-.84V6.334z" fill="#959595"></path>
                                  </g>
                                </svg>
                                <span style="margin-left:10px">{{ numberWithCommas(item.deliveryfee) }}</span>
                            </div>
                        </div>
                        <!-- Product actions-->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <span>{{ item.sellid }}</span>
                            <div class="text-center page-button"><a class="btn btn-outline-dark mt-auto" :href= "item.detail" onclick="window.open(this.href, '_blank'); return false;">상세페이지</a></div>
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
      if(x == 0) {
        return "무료"
      }
      else if(!x || isNaN(x)) {
        return "별도확인필요";
      }
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
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

.page-button {
  display: block;
  border-top: 1px solid #ebecee;
  margin-left: 10px;
  padding-left: 10px;
}
</style>
