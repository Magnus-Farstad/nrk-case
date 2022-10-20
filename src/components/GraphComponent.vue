<template>
  <div class="graphContainer">
    <div class="canvasContainer">
      <canvas id="myChart" width="560" height="480"></canvas>
    </div>
    <div class="canvasContainer">
      <canvas id="myChart1" width="560" height="480"></canvas>
    </div>
    <div class="canvasContainer">
      <canvas id="myChart2" width="560" height="480"></canvas>
    </div>
    <div class="canvasContainer">
      <canvas id="myChart3" width="560" height="480"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "GraphComponent",
  components: {},
  data() {
    return {
      seriesArray: this.$store.state.currentSeries,
    };
  },
  props: {
    msg: String,
  },
  methods: {
    initMobileChart() {
      let dateArray = [];
      let viewsArray = [];
      for (let j = 0; j < this.seriesArray.length; j++) {
        if (this.seriesArray[j].screen === "mobile") {
          dateArray.push(this.seriesArray[j].date);
          viewsArray.push(this.seriesArray[j].views);
        }
      }
      // let test = Date.parse(dateArray[0]).toString();
      const ctx = document.getElementById("myChart").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dateArray,
          datasets: [
            {
              label: "Mobile Views",
              data: viewsArray,
              borderWidth: 1,
              borderColor: "rgb(192,165,75)",
              radius: 0,
            },
          ],
        },
      });
      myChart;
    },
    initTabletChart() {
      let dateArray = [];
      let viewsArray = [];
      for (let k = 0; k < this.seriesArray.length; k++) {
        if (this.seriesArray[k].screen === "tablet") {
          dateArray.push(this.seriesArray[k].date);
          viewsArray.push(this.seriesArray[k].views);
        }
      }
      const ctx = document.getElementById("myChart1").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dateArray,
          datasets: [
            {
              label: "Tablet Views",
              data: viewsArray,
              borderWidth: 1,
              borderColor: "rgb(192,75,102)",
              radius: 0,
            },
          ],
        },
      });
      myChart;
    },
    initDesktopChart() {
      let dateArray = [];
      let viewsArray = [];
      for (let i = 0; i < this.seriesArray.length; i++) {
        if (this.seriesArray[i].screen === "desktop") {
          dateArray.push(this.seriesArray[i].date);
          viewsArray.push(this.seriesArray[i].views);
        }
      }
      const ctx = document.getElementById("myChart2").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dateArray,
          datasets: [
            {
              label: "Desktop Views",
              data: viewsArray,
              borderWidth: 1,
              borderColor: "rgb(93,192,75)",
              radius: 0,
            },
          ],
        },
      });
      myChart;
    },
    initTotalChart() {
      let dateArray = [];
      let viewsArray = [];
      for (let i = 0; i < this.seriesArray.length; i++) {
        dateArray.push(this.seriesArray[i].date);
        viewsArray.push(this.seriesArray[i].views);
      }
      const ctx = document.getElementById("myChart3").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dateArray,
          datasets: [
            {
              label: "Total Views",
              data: viewsArray,
              borderWidth: 1,
              borderColor: "rgb(75,91,192)",
              radius: 0,
            },
          ],
        },
      });
      myChart;
    },
  },
  mounted() {
    this.initDesktopChart();
    this.initTabletChart();
    this.initMobileChart();
    this.initTotalChart();
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}

.graphContainer {
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
.canvasContainer {
  box-shadow: 1px 1px 10px gray;
  border-radius: 20px;
  border: solid rgba(0, 0, 0, 0.32);
  padding: 10px;
  width: 35rem;
  height: 480px;
  margin: 2rem;
  transition: 100ms;
}

.canvasContainer:hover {
}
</style>
