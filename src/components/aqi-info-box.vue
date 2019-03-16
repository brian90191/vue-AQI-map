<template>
  <div class='my-legend' v-show="'SiteName' in aqiData">
    <div class='legend-title' :style="{ background: getAQIColor(aqiData.AQI) }">{{ aqiData.County + aqiData.SiteName }}</div>
    <div class='legend-scale'>
      <ul class='legend-labels'>
        <li><span>AQI 空氣品質指標</span> {{ aqiData.AQI }}</li>
        <li><span>PM2.5 細懸浮微粒</span> {{ aqiData["PM2.5"] }} (μg/m3)</li>
        <li><span>PM10 懸浮微粒</span> {{ aqiData.PM10 }} (μg/m3)</li>
        <li><span>O3 臭氧</span> {{ aqiData.AQI }} (ppb)</li>
        <li><span>CO 一氧化碳</span> {{ aqiData.AQI }} (ppm)</li>
        <li><span>SO2 二氧化硫</span> {{ aqiData.AQI }} (ppb)</li>
        <li><span>NO2 二氧化氮</span> {{ aqiData.AQI }} (ppb)</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["aqiData"],
  data() {
      return {
        isShow: false,
      }
  },
  methods: {
    getAQIColor: function(value){
      let colorStr = "grey";
      if (value === "") {
        return colorStr;
      }
            
      if (value >= 301) {
        colorStr = "rgb(128,0,128,0.7)";
      } else if (value >= 201) {
        colorStr = "rgb(165, 42, 42,0.7)";
      } else if (value >= 151) {
        colorStr = "rgb(255,0,0,0.7)";
      } else if (value >= 101) {
        colorStr = "rgb(255,165,0,0.7)";
      } else if (value >= 51) {
        colorStr = "rgb(255,255,102,0.7)";
      } else {
        colorStr = "rgb(154,205,50,0.7)";
      }

      return colorStr;
    },
  },
}
</script>

<style scoped>
  .my-legend {
    height: 170px;
    background-color: white;
    padding: 10px;
    border-radius: 3px;
    -webkit-box-shadow: 0px 0px 20px 5px rgba(110, 120, 120, 0.39);
    -moz-box-shadow: 0px 0px 20px 5px rgba(110, 120, 120, 0.39);
    box-shadow: 0 2px 5px 0 #6e7878, 0 2px 5px 0 rgba(110, 120, 120, 0.19);
  }

  .my-legend .legend-title {
    text-align: left;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 90%;
    border: 1px solid #999;
    padding: 3px;
    text-align: center;
    filter: Alpha(opacity=50);
  }

  .my-legend .legend-scale ul {
    margin: 0;
    margin-bottom: 5px;
    padding: 0;
    float: left;
    list-style: none;
  }

  .my-legend .legend-scale ul li {
    font-size: 80%;
    list-style: none;
    margin-left: 0;
    line-height: 18px;
    margin-bottom: 2px;
    text-align: left;
  }

  .my-legend ul.legend-labels li span {
    display: block;
    float: left;
    height: 16px;
    width: 100px;
    margin-right: 5px;
    margin-left: 0;
  }

  .my-legend .legend-source {
    font-size: 70%;
    color: #999;
    clear: both;
  }

  .my-legend a {
    color: #777;
  }
</style>
