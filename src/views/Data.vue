<template>
  <div>
    <Header></Header>
    <Navigation v-bind:getUser="getUser"></Navigation>
    <div class="container px-4 px-lg-5 mt-5">
      <form class="d-flex" ref="scrollTarget" v-on:submit.prevent="onSubmit">
        <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" v-model="searchQuery"/>
        <button type="button" class="searchButton" v-on:click="initializeChart"><i class="fa fa-search"></i></button>
      </form>
      <div class="chart-container">
        <canvas ref="chart1" class="chart"></canvas>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js/auto';
import { shallowRef } from 'vue';
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'
import axios from 'axios'

export default {
  name: 'Cart',
  components: {
    Header,
    Footer,
    Navigation
  },
  data() {
    return {
      user: null,
      searchQuery: '',
      chart1: null,
      data : []
    };
  },
  props : {
    getUser : Function,
  },
  mounted : function() {
    this.user = this.getUser();
    Chart.register(...registerables);
    this.initializeChart();
  },
  methods: {
    showLoadingOverlay() {
      this.loader = this.$loading.show({
        // Optional parameters
        container: null,
        width: 100,
        height: 100,
        loader: "bars",
        canCancel: false,
      });
    },
    onSubmit() {
      // 제출을 막는 코드
      this.initializeChart();
      return false;
    },
    async initializeChart() {

      this.showLoadingOverlay();
      
      try {
        const baseURI = 'https://api.jurospring.o-r.kr';
        const axiosInstance = axios.create({
          withCredentials: true,
        });
        const result = await axiosInstance.get(`${baseURI}/` + "statistic",
        {
          params : {
            searchValue : this.searchQuery
          }
        },
        ).then((result) => {
          result.data.sort(function(a, b) {
            if (a.keyAsString < b.keyAsString) {
              return -1; // a가 b보다 앞에 올 때 음수 반환
            }
            if (a.keyAsString > b.keyAsString) {
              return 1; // a가 b보다 뒤에 올 때 양수 반환
            }
            return 0; // a와 b가 동일할 때 0 반환
          });
          this.data = result.data;
          // result.data.forEach(e => {
          //   e.isPriceValid = true;
          //   e.isSearchValueValid = true;
          //   this.items.push(e);
          // });
          // console.log(this.items);
        });
      } catch(e) {
        console.log(e);
      } finally {
        this.loader.hide();
      }

      // 그래프 준비
      let labels = this.data.map(item => item.keyAsString);
      let prices = this.data.map(item => item.averagePrice);
      let volumes = this.data.map(item => item.docCount);

      if (this.chart1){
        this.chart1.data.labels = labels;
        this.chart1.data.datasets[0].data = prices;
        this.chart1.data.datasets[1].data = volumes;
        this.chart1.update();
      }
      else {
        this.chart1 = shallowRef(new Chart(this.$refs.chart1, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: '가격평균(L)',
              data: prices,
              borderColor: 'blue',
              type: 'line',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              borderWidth: 1,
              yAxisID: 'y' // 왼쪽 축 사용
            },
            {
              label: '등록건수(R)',
              data: volumes,
              borderColor: 'green',
              type: 'bar',
              backgroundColor: 'rgba(0, 255, 0, 0.1)',
              borderWidth: 1,
              yAxisID: 'y1' // 왼쪽 축 사용
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: false,
                text: '일자'
              }
            },
            y: {
              display: true,
              title: {
                display: false,
                text: '가격평균'
              },
              beginAtZero: true,
              position: 'left',
              ticks: {
                callback: function(value, index, values) {
                  return value + '원';
                }
              }
            },
            y1: {
              display: true,
              title: {
                display: false,
                text: '등록건수'
              },
              beginAtZero: true,
              position: 'right',
              ticks: {
                callback: function(value, index, values) {
                  return value + '건';
                }
              }
            }
          }
        }
        }
        ));
      }
      const scrollTarget = this.$refs.scrollTarget;
      window.scrollTo({
        top: scrollTarget.offsetTop,
      });
    }
  }
};
</script>

<style scoped>
.searchButton {
  border: none;
  background: none;
  padding-left: 1em !important;
}
.chart-container {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.chart {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>