<template>
  <section>
      <div class="container px-4 px-lg-5 mt-5">
          <form class="d-flex" ref="scrollTarget" v-on:submit.prevent="onSubmit">
            <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" v-model="searchValue"/>
            <button type="button" class="searchButton" v-on:click="movePage(1, 'search')"><i class="fa fa-search"></i></button>
          </form>
          <form v-on:submit.prevent="onSubmit">
            <div class="detailSearch">
              <div class="searchType">가격검색</div>
              <div class="searchType2">
                <span>
                  <input class="searchInput1" type="number" placeholder="최소가격" v-model="searchMinPrice"/>원
                </span>
                <span>~</span>
                <span>
                  <input class="searchInput2" type="number" placeholder="최대가격" v-model="searchMaxPrice"/>원
                </span>
                <button type="button" class="searchButton" style="padding-left: 0.2em !important;" v-on:click="movePage(1, 'search')"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </form>
          <div class="sortArea">
            <a class="sortElement" href="javascript:void(0);" role="button" v-on:click="movePage(1, 'order_scoreDESC')" v-bind:style="{ 
              color: searchSort == ''? 'red' : 'black',
              cursor: searchSort == ''? 'default' : 'pointer',
              'font-weight': searchSort == ''? 'bold' : 'normal',
              }">연관도순</a>
            <a class="sortElement" href="javascript:void(0);" role="button" v-on:click="movePage(1, 'order_dateDESC')" v-bind:style="{ 
              color: searchSort == 'dateDESC'? 'red' : 'black',
              cursor: searchSort == 'dateDESC'? 'default' : 'pointer',
              'font-weight': searchSort == 'dateDESC'? 'bold' : 'normal',
              }">최신순</a>
            <a class="sortElement" href="javascript:void(0);" role="button" v-on:click="movePage(1, 'order_dateASC')" v-bind:style="{ 
              color: searchSort == 'dateASC'? 'red' : 'black',
              cursor: searchSort == 'dateASC'? 'default' : 'pointer',
              'font-weight': searchSort == 'dateASC'? 'bold' : 'normal',
              }">오래된순</a>
            <a class="sortElement" href="javascript:void(0);" role="button" v-on:click="movePage(1, 'order_priceASC')" v-bind:style="{ 
              color: searchSort == 'priceASC'? 'red' : 'black',
              cursor: searchSort == 'priceASC'? 'default' : 'pointer',
              'font-weight': searchSort == 'priceASC'? 'bold' : 'normal',
              }">낮은 가격순</a>
            <a class="sortElement" href="javascript:void(0);" role="button" v-on:click="movePage(1, 'order_priceDESC')" v-bind:style="{ 
              color: searchSort == 'priceDESC'? 'red' : 'black',
              cursor: searchSort == 'priceDESC'? 'default' : 'pointer',
              'font-weight': searchSort == 'priceDESC'? 'bold' : 'normal',
              }">높은 가격순</a>
          </div>
          <h3 v-if="goods.length == 0">검색 결과가 존재하지 않습니다.</h3>
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <ul v-for="item in goods">
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
          </div>
          <div class="pagination justify-content-center">
            <a class="pagination_next" v-if="pagination && pagination.existPrevPage" href="javascript:void(0);" v-on:click="movePage(1, 'back')">
              처음
              <svg class="after" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path transform="scale(-1, 1) translate(-100, 0)" d="M80 50L20 10V90Z" />
                <path transform="scale(-1, 1) translate(-150, 0)" d="M80 50L20 10V90Z" />
              </svg>
            </a>
            <a class="pagination_next" v-if="pagination && pagination.existPrevPage" href="javascript:void(0);" v-on:click="movePage(pagination.startPage - 1, 'back')">
              이전
              <svg class="after" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path transform="scale(-1, 1) translate(-100, 0)" d="M80 50L20 10V90Z" />
              </svg>
            </a>
            <div class="pagination_num">
              <a class="pagination_btn_page" v-for="i in filteredNum" href="javascript:void(0);" v-on:click="movePage(i, 'current')" v-bind:style="{ 
                color: !searchDto && i == 1? 'red' : searchDto && searchDto.page == i ? 'red' : 'black',
                cursor: !searchDto && i == 1? 'default' : searchDto && searchDto.page == i ? 'default' : 'pointer'
                }">{{ i }}</a>
            </div>
            <a class="pagination_next" v-if="pagination && pagination.existNextPage" href="javascript:void(0);" v-on:click="movePage(pagination.endPage + 1, 'forward')">
              다음
              <svg class="after" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 50L20 90V10Z" />
              </svg>
            </a>
            <a class="pagination_next" v-if="pagination && pagination.existNextPage" href="javascript:void(0);" v-on:click="movePage(pagination.totalPageCount, 'forward')">
              마지막
              <svg class="after" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 50L20 90V10Z" />
                <path d="M80 50L20 90V10Z" transform="translate(50,0)" />
              </svg>
            </a>
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
      searchValue: '',
      searchMinPrice: '',
      searchMaxPrice: '',
      searchSort: '',
      goods : [],
      pagination: null,
      searchDto: null,
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
    onSubmit() {
      // 제출을 막는 코드
      this.movePage(1, 'search');
      return false;
    },
    movePage(page, position) {
      if(position == "current") {
        if(!this.searchDto && page == 1) return;
        else if(this.searchDto && this.searchDto.page == page) return;
      }
      if(position.includes("order")) {
        if(this.searchSort == position.substring(position.indexOf("_") + 1)) return;
        this.searchSort = position.substring(position.indexOf("_") + 1);
      }
      let queryParams = {
        page: (page) ? page : 1,
        recordSize: 8,
        pageSize: 5,
        searchValue: this.searchValue,
        searchMinPrice: this.searchMinPrice,
        searchMaxPrice: this.searchMaxPrice,
        orderBy: this.searchSort
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
        const scrollTarget = this.$refs.scrollTarget;
        window.scrollTo({
          top: scrollTarget.offsetTop,
        });
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
    }
  },
  computed: {
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
  margin: 0em 0.5em;
}
.after {
  width: 1em;
  height: 7px;
  display: inline-block;
  margin: 10px 0 0 4px;
  vertical-align: top;
  content: "";
}
.form-control {
  border-radius: 0px !important;
  height: 35px;
  margin-top:3px;
  padding-right: 0px !important;
  margin-right: 0px !important;
}
.searchButton {
  border: none;
  background: none;
  padding-left: 1em !important;
}
.sortArea {
  text-align: left;
  font-size: small;
  margin-bottom: 50px;
  position: relative;
  z-index: 20;
  height: 42px;
  border-bottom: 1px solid #ebebeb;
}
.sortArea .sortElement {
  display: inline-block;
  margin-left: 10px;
  font-family: gulim,sans-serif;
  line-height: 42px;
  color: #959595;
  vertical-align: top;
  letter-spacing: -.5px;
}
.detailSearch {
  margin-left: 0px !important;
  padding-left: 0px !important;
  text-align: left;
  margin-top: 20px;
}
.detailSearch .searchType {
  text-align: center;
  display: inline-block;
  position: relative;
  top: -1px;
  bottom: -1px;
  left: 0px;
  width: 20%;
  background-color: black;
  font-size: 12px;
  font-weight: 700;
  line-height: 41px;
  color: #fff;
  box-sizing: border-box;
}
.detailSearch .searchType2 {
  display: inline-block;
  max-width: 78%;
  max-height: 41px;
  background: none;
  border: 0;
  margin-left: 2%;
  height: 41px;
  vertical-align: sub;
}
.detailSearch .searchInput1 {
  width: 28%;
}
.detailSearch .searchInput2 {
  margin-left: 1%;
  width: 40%;
}
</style>
