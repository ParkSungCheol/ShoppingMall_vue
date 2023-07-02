<template>
  <div>
    <div class="search-bar">
      <input v-model="searchQuery" type="text" placeholder="검색어를 입력하세요">
      <button @click="search">검색</button>
    </div>
    <div class="chart-container">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      searchQuery: '',
      chart: null
    };
  },
  mounted() {
    this.initializeChart();
  },
  methods: {
    initializeChart() {
      const ctx = this.$refs.chart.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: '가격평균',
              data: [],
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
    },
    search() {
      // 검색 버튼을 클릭할 때 실행되는 메소드
      // 검색어(this.searchQuery)를 사용하여 데이터를 가져오고 그래프를 업데이트합니다.

      // 예시 데이터 (임의로 생성한 데이터)
      const data = [
        { date: '2023-07-01', price: 10, volume: 50 },
        { date: '2023-07-02', price: 20, volume: 70 },
        { date: '2023-07-03', price: 15, volume: 40 },
        { date: '2023-07-04', price: 25, volume: 60 },
        // ...
      ];

      console.log(data);
      // 검색어를 사용하여 데이터 필터링
      // const filteredData = data.filter(item => item.name === this.searchQuery);

      // 그래프 업데이트
      // const labels = data.map(item => item.date);
      // const prices = data.map(item => item.price);
      // const volumes = data.map(item => item.volume);

      // this.chart.data.labels = labels;
      // this.chart.data.datasets[0].data = prices;
      // this.chart.update();
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