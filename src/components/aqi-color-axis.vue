<template>
  <div class='my-legend'>
    <div class='legend-title'>{{ title }}</div>
    <div class='legend-scale'>
      <ul class='legend-labels'>
        <li v-for="axis in colorAxis" :key="axis.value">
            <span :style="{background: axis.color}"></span> {{ axis.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "AQI 空氣品指標",
      colorAxis: [
        {
          value: "0",
          color: "rgb(154,205,50,0.7)",
          description: "良好"
        },
        {
          value: "51",
          color: "rgb(255,255,102,0.7)",
          description: "普通"
        },
        {
          value: "101",
          color: "rgb(255,165,0,0.7)",
          description: "對敏感族群不健康"
        },
        {
          value: "151",
          color: "rgb(255,0,0,0.7)",
          description: "對所有族群不健康"
        },
        {
          value: "201",
          color: "rgb(165, 42, 42,0.7)",
          description: "非常不健康"
        },
        {
          value: "301",
          color: "rgb(128,0,128,0.7)",
          description: "危害"
        }
      ],
    }
  }
}
</script>

<style scoped>
  .my-legend {
    height: 140px;
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
    width: 30px;
    margin-right: 5px;
    margin-left: 0;
    border: 1px solid #999;
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