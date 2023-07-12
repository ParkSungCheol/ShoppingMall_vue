<template>
    <div>
      <div class="container px-4 px-lg-5 mt-5">
        <form class="d-flex" ref="scrollTarget" v-on:submit.prevent="onSubmit">
          <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" v-model="searchQuery"/>
          <button type="button" class="searchButton" v-on:click="initializeChart"><i class="fa fa-search"></i></button>
        </form>
        <div class="chart-container">
          <canvas ref="chart" class="chart"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js/auto';
  import { shallowRef } from 'vue';
  import axios from 'axios'
  
  export default {
    name: 'Data',
    data() {
      return {
        searchQuery: '',
        chart: null,
        data : []
      };
    },
    mounted : function() {
      Chart.register(...registerables);
      this.initializeChart();
    },
    methods: {
      // 로딩바 표시
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

      // 로딩바 숨김
      hideLoadingOverlay() {
        this.loader.hide();
      },

      // Submit의 제출은 막고 차트 그리는 function 호출
      onSubmit() {
        this.initializeChart();
        return false;
      },
      // 차트 그리기
      async initializeChart() {

        // 처음 차트 그려진 후 사용자가 검색어 입력 후부터
        if (this.chart){
          if(this.searchQuery.trim().length < 2) {
            alert("검색어는 최소 2글자 이상 입력해주세요!");
            return;
          }

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
              // 날짜 기준으로 ASC로 정렬
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

              // 데이터 로드 완료 후 로딩바 숨김
              this.hideLoadingOverlay();
            });
          } catch(e) {
            // 에러 발생 시에도 로딩바 숨김
            this.hideLoadingOverlay();
          }
        }
  
        // 그래프 input 데이터
        let labels = this.data.map(item => item.keyAsString);
        let prices = this.data.map(item => item.averagePrice);
        let volumes = this.data.map(item => item.docCount);
  
        // 기존에 chart가 그려진 상태라면 데이터 업데이트
        if (this.chart){
          this.chart.data.labels = labels;
          this.chart.data.datasets[0].data = prices;
          this.chart.data.datasets[1].data = volumes;
          this.chart.update();
        }
        // 처음 chart를 그리는 경우라면 chart 그리기
        else {
          this.chart = shallowRef(new Chart(this.$refs.chart, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: '가격평균(L)',
                data: prices,
                borderColor: 'blue',
                // 꺾은선그래프 type
                type: 'line',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                borderWidth: 1,
                yAxisID: 'y' // 왼쪽 축 사용
              },
              {
                label: '등록건수(R)',
                data: volumes,
                borderColor: 'green',
                // 바그래프 type
                type: 'bar',
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                borderWidth: 1,
                yAxisID: 'y1' // 오른쪽 축 사용
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
                // 가장 하단은 0부터 시작
                beginAtZero: true,
                // y축은 왼쪽
                position: 'left',
                // 틱 단위 표현 시 '원' 문자열 포함하여 출력
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
                // 가장 하단은 0부터 시작
                beginAtZero: true,
                // y1축은 오른쪽
                position: 'right',
                // 틱 단위 표현 시 '건' 문자열 포함하여 출력
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
        // 검색 시 스크롤링 위치를 inputBox로 이동
        if(this.searchQuery.trim().length > 1) {
          const scrollTarget = this.$refs.chart;
          window.scrollTo({
            top: scrollTarget.offsetTop + 5,
          });
        }
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