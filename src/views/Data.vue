<template>
  <div>
    <div class="search-bar">
      <input v-model="searchQuery" type="text" placeholder="검색어를 입력하세요">
      <button @click="initializeChart">검색</button>
    </div>
    <div class="chart-container">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js/auto';

export default {
  data() {
    return {
      searchQuery: '',
      chart: null
    };
  },
  async mounted() {
    this.$nextTick(function () {
      this.initializeChart();
    })
  },
  methods: {
    initializeChart() {
      Chart.register(...registerables);
      const data = [
        { date: '2023-07-01', price: 10, volume: 50 },
        { date: '2023-07-02', price: 20, volume: 70 },
        { date: '2023-07-03', price: 15, volume: 40 },
        { date: '2023-07-04', price: 25, volume: 60 },
        // ...
      ];

      // 그래프 준비
      const labels = data.map(item => item.date);
      const prices = data.map(item => item.price);
      const volumes = data.map(item => item.volume);

      if (this.chart){
        data.forEach(e => e.price = e.price + 5);
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = prices;
        this.chart.render();
      }
      else {
        this.chart = new Chart(this.$refs.chart, {
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
        });
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