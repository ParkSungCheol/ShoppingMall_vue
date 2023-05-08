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
          <h3 v-if="filteredList.length == 0">검색 결과가 존재하지 않습니다.</h3>
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <ul v-for="item in filteredList">
                <div class="col mb-5">
                    <div class="card h-100">
                        <!-- Product image-->
                        <a class="clickObject" :href= "item.detail" onclick="window.open(this.href, '_blank'); return false;"><img class="card-img-top" :src="item.image? item.image : 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'" alt="..." /></a>
                        <!-- Product details-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder"><a class="clickObject" :href= "item.detail" onclick="window.open(this.href, '_blank'); return false;">{{ item.name }}</a></h5>
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
                        </div>
                    </div>
                </div>
            </ul>
            <div class="pagination">
            <a class="pagination_next" v-if="pagination && pagination.existPrevPage" href="javascript:void(0);" v-on:click="movePage(1)">
              처음
              <svg class="after" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path transform="scale(-1, 1) translate(-100, 0)" d="M80 50L20 10V90Z" />
                <path transform="scale(-1, 1) translate(-150, 0)" d="M80 50L20 10V90Z" />
              </svg>
            </a>
            <a class="pagination_next" v-if="pagination && pagination.existPrevPage" href="javascript:void(0);" v-on:click="movePage(pagination.startPage - 1)">
              이전
              <svg class="after" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path transform="scale(-1, 1) translate(-100, 0)" d="M80 50L20 10V90Z" />
              </svg>
            </a>
            <div class="pagination_num">
              <a class="pagination_btn_page" v-for="i in filteredNum" href="javascript:void(0);" v-on:click="if(!searchDto && i == 1) return; else if(searchDto && searchDto.page == i) return; else movePage(i)" v-bind:style="{ color: !searchDto && i == 1? 'red' : searchDto && searchDto.page == i ? 'red' : 'black' }">{{ i }}</a>
            </div>
            <a class="pagination_next" v-if="pagination && pagination.existNextPage" href="javascript:void(0);" v-on:click="movePage(pagination.endPage + 1)">
              다음
              <svg class="after" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 50L20 90V10Z" />
              </svg>
            </a>
            <a class="pagination_next" v-if="pagination && pagination.existNextPage" href="javascript:void(0);" v-on:click="movePage(pagination.totalPageCount)">
              마지막
              <svg class="after" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 50L20 90V10Z" />
                <path d="M80 50L20 90V10Z" transform="translate(50,0)" />
              </svg>
            </a>
            </div>
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
      pagination: null,
      searchDto: null,
      sortDir : '',
      sortMsg : 'Sort',
      sorts : ['Name', 'Price']
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
    movePage(page) {
      const queryParams = {
        page: (page) ? page : 1,
        recordSize: 8,
        pageSize: 10
      }
      const baseURI = 'https://api.jurospring.o-r.kr';
      axios.get(`${baseURI}/goods`,
      {
        params : queryParams
      },
      ).then(result => {
      console.log(result);
      this.goods = result.data.list;
      this.pagination = result.data.pagination;
      this.searchDto = result.data.searchDto;
      });
    },
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
        this.goods = result.data.list;
        this.pagination = result.data.pagination;
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
    },
    filteredNum() {
      if(this.pagination) {
        const start = this.pagination.startPage;
        const end = this.pagination.endPage;
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
      }
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
.clickObject {
  text-decoration: none;
  color: black;
  cursor: pointer;
}
.pagination {
  width: auto;
  padding: 20px 0 35px;
  text-align: center;
}
.pagination .pagination_num {
  display: inline-block;
  margin: 0 2px;
  vertical-align: top;
}

.pagination .pagination_next {
  display: inline-block;
  margin: 0 4px;
  font-family: gulim,sans-serif;
  font-size: 12px;
  line-height: 28px;
  color: #959595;
  vertical-align: top;
}
.pagination .pagination_btn_page {
  display: inline-block;
  width: 26px;
  border: 1px solid transparent;
  font-family: tahoma,sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 26px;
  color: #333;
}
.after {
  width: 5px;
  height: 7px;
  display: inline-block;
  margin: 10px 0 0 4px;
  vertical-align: top;
  content: "";
}
</style>
