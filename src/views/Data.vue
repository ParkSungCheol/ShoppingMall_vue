<template>
  <div>
    <Header></Header>
    <Navigation v-bind:getUser="getUser"></Navigation>
    <div class="search-bar">
      <input v-model="searchQuery" type="text" placeholder="검색어를 입력하세요">
      <button @click="initializeChart">검색</button>
    </div>
    <div class="chart-container">
      <canvas ref="chart"></canvas>
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
      chart: null,
      data : [
        { date: '2023-07-01', price: 10, volume: 50 },
        { date: '2023-07-02', price: 20, volume: 70 },
        { date: '2023-07-03', price: 15, volume: 40 },
        { date: '2023-07-04', price: 25, volume: 60 },
        // ...
      ]
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
    initializeChart() {
      // 그래프 준비
      let labels = this.data.map(item => item.date);
      let prices = this.data.map(item => item.price);
      let volumes = this.data.map(item => item.volume);

      if (this.chart){
        this.data.forEach(e => e.price += 5);
        prices = this.data.map(item => item.price);
        this.chart.data.datasets[0].data = prices;
        this.chart.update();
      }
      else {
        this.chart = shallowRef(new Chart(this.$refs.chart, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: '가격평균',
              data: prices,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: '일자'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: '가격'
              }
            }
          }
        }
        }
        ));
      }
    }
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-container {
  height: 400px;
}
</style>