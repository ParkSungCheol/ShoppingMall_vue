<template>
  <div>
    <Header></Header>
    <Navigation v-bind:getUser="getUser"></Navigation>
    <div class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="검색어 입력" />
      <button @click="search">검색</button>
    </div>
    <div class="chart-container">
      <canvas ref="chart"></canvas>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Chart from 'chart.js';
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'
//import axios from 'axios'

export default {
  name: 'Data',
  components: {
    Header,
    Footer,
    Navigation
  },
  data() {
    return {
      user: null,
      searchTerm: '',
      chartData: null
    };
  },
  props : {
    getUser : Function,
  },
  mounted : function() {
    this.user = this.getUser();
    //this.getSearch();
  },
  methods: {
    search() {
      // 검색 요청을 수행하고 데이터를 가져오는 로직을 구현합니다.
      // 예시로 임시로 가상의 데이터를 생성하여 그래프를 그립니다.
      const mockData = {
        labels: ['2023-06-01', '2023-06-02', '2023-06-03'], // 일자 데이터
        prices: [10.5, 11.2, 9.8], // 가격 데이터
        volumes: [100, 150, 80] // 거래량 데이터
      };

      // 가격 평균 데이터 생성
      const averagePrices = mockData.prices.map(price => {
        return parseFloat((price / mockData.prices.length).toFixed(2));
      });

      // 차트 데이터 설정
      this.chartData = {
        labels: mockData.labels,
        datasets: [
          {
            label: '가격 평균',
            data: averagePrices,
            backgroundColor: 'rgba(75, 192, 192, 0.5)'
          },
          {
            label: '거래량',
            data: mockData.volumes,
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }
        ]
      };

      // 그래프 그리기
      this.drawChart();
    },
    drawChart() {
      const ctx = this.$refs.chart.getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        data: this.chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.chart-container {
  height: 400px;
}
</style>
