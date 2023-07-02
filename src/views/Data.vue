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
      // 검색어(this.searchQuery)를 사용하여 데이터를 가져오고 그래프를 준비합니다.

      // 예시 데이터 (임의로 생성한 데이터)
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

      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = prices;
      // 거래량도 추가하려면 데이터셋 추가하고 volumes로 데이터 설정
      this.chart.data.datasets[1].data = volumes;

      // 그래프 업데이트하지 않고 그래프 데이터만 준비한 상태로 리턴
      return {
        labels,
        prices,
        volumes,
      };
    },
    updateChart() {
      // search() 함수에서 준비한 그래프 데이터를 사용하여 그래프를 업데이트합니다.
      this.chart.update();
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