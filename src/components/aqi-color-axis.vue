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
          color: "YellowGreen",
          description: "良好"
        },
        {
          value: "51",
          color: "#FFFF66",
          description: "普通"
        },
        {
          value: "101",
          color: "orange",
          description: "對敏感族群不健康"
        },
        {
          value: "151",
          color: "red",
          description: "對所有族群不健康"
        },
        {
          value: "201",
          color: "brown",
          description: "非常不健康"
        },
        {
          value: "301",
          color: "purple",
          description: "危害"
        }
      ],
    }
  }
}
</script>

<style>
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