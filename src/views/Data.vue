<template>
  <div>
    <Header></Header>
    <Navigation v-bind:getUser="getUser"></Navigation>
    <div>
      <input type="text" v-model="searchKeyword" placeholder="검색어를 입력하세요">
      <button @click="search">검색</button>
    </div>
    <div>
      <canvas ref="chart"></canvas>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
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
      user: null
    }
  },
  props : {
    getUser : Function,
  },
  mounted : function() {
    this.user = this.getUser();
    //this.getSearch();
  },
  setup() {
    const searchKeyword = ref('');
    const chartRef = ref(null);

    onMounted(() => {
      Chart.register(...registerables);
      chartRef.value = this.$refs.chart;
    });

    const search = () => {
      // 검색 요청을 수행하고 데이터를 받아오는 로직을 구현

      // 가상의 데이터로 예시를 보여주는 코드
      const data = {
        labels: ['2023-07-01', '2023-07-02', '2023-07-03', '2023-07-04'],
        prices: [10, 15, 12, 8],
        volumes: [100, 150, 120, 80]
      };

      // 그래프를 그리는 함수 호출
      drawChart(data.labels, data.prices, data.volumes);
    };

    const drawChart = (labels, prices, volumes) => {
      if (chartRef.value) {
        chartRef.value.destroy();
      }

      const ctx = chartRef.value.getContext('2d');

      chartRef.value = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: '가격 평균',
              data: prices,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: '거래량',
              data: volumes,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    };

    return {
      searchKeyword,
      chartRef,
      search
    };
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
