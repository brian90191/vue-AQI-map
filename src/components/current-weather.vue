<template>
  <div id="weatherCard" class="weatherCard" v-show="'name' in owm">
		<div class="weatherContent">
			<div class="weatherheader">
				<div class="weatherDT">現在天氣</div>
			</div>
			<div class="weatherCity">{{ getCityName }}</div>
			<div v-show="false">{{ latlonArr }}</div>
			<div class="weatherIcon">
				<i v-bind:class="getIconClass"></i>
				<div class="weatherDesc">{{owm.weather && owm.weather[0].description || ''}}</div>
			</div>
			<div class="weatherInfos">
				<div class="weatherInfo">
					<i class="wi wi-thermometer wi-fw"></i>
					<span id="wtp">{{ tempToCel }}</span>
					<i class="wi wi-celsius wi-fw"></i>
				</div>
				<div class="weatherInfo">
					<i class="wi wi-humidity wi-fw"></i>
					<span id="wh">{{owm.main && owm.main.humidity || ''}}</span> %
				</div>
				<div class="weatherInfo">
					<i class="wi wi-small-craft-advisory wi-fw"></i>
					<span id="wwd">{{owm.wind && owm.wind.speed || ''}}</span> m/s
					<i id="wwdIcon" v-bind:class="getWindDeg"></i>
				</div>
				<div class="weatherInfo">
					<i class="wi wi-barometer wi-fw"></i>
					<span id="wp">{{owm.main && owm.main.pressure || ''}}</span> hPa
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: ["LatLon"],
  data() {
    return {
      owmUrl: "http://api.openweathermap.org/data/2.5/weather?",
      ownAppid: "d1a482530f24a5061dbe554ca1a11a80",
      owm: {},
      owmLatLon: this.LatLon,
    }
  },
  mounted() {
    //get weather data
    this.getOWMData();
  },
  watch: { 
    LatLon: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.owmLatLon = newVal;
        this.getOWMData();
      }
    }
  },
  computed:{
      getCityName: function(){
        return ((this.owm.name !== undefined) ? this.owm.name:"") +
          ((this.owm.sys !== undefined && this.owm.sys.country !== undefined) ? ", "+this.owm.sys.country:"");
      },
      getIconClass: function(){
        if (this.owm.weather !== undefined && this.owm.weather[0].icon !== undefined && this.owm.weather[0].icon !== "") {
          return "owi owi-" + (this.owm.weather[0].icon === "50n"? "50d":this.owm.weather[0].icon);
        } else {
          return "";
        }
      },
      tempToCel: function(){
        if (this.owm.main !== undefined && this.owm.main.temp !== undefined && this.owm.main.temp !== "") {
          return ((this.owm.main.temp * 10000 - 273.15 * 10000) / 10000).toFixed(0);
        } else {
          return "";
        }
      },
      getWindDeg: function() {
        if (this.owm.wind !==undefined && this.owm.wind.deg !== undefined && this.owm.wind.deg !== "") {
          return (
            "wi wi-wind wi-fw towards-" +
            (this.owm.wind.deg + 180 >= 360 ? this.owm.wind.deg + 180 - 360 : this.owm.wind.deg + 180).toFixed(0) +
            "-deg"
          );
        } else {
          return "";
        }
      },
      latlonArr: function(){
        if (this.lat && this.lon){
          this.getCurrentLocWeather();   
        }
        return [this.lat, this.lon];
      },
  },
  methods: {
    getOWMData(){
      //get weather data
      let weatherAPI = `${this.owmUrl}lang=ZH_TW&lat=${this.owmLatLon.lat}&lon=${this.owmLatLon.lon}&appid=${this.ownAppid}`;
      this.$axios.get(weatherAPI)
        .then(response => {
          console.log(response);
          this.owm = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>
.weatherCard {
    /* display: none; */
    color: white;
    /* position: absolute;
    left: 10px;
    bottom: 18px; */
    width: 160px;
    min-height: 50px;
    margin: 0 auto;
}

.weatherContent {
    border-radius: 5px;
    min-height: 50px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    background: #2ca6cb;
    -webkit-box-shadow: 0px 0px 49px 14px rgba(5, 5, 5, 0.6);
    -moz-box-shadow: 0px 0px 49px 14px rgba(5, 5, 5, 0.6);
    box-shadow: 0 1px 1px 0 #6e7878, 0 2px 5px 0 rgba(5, 5, 5, 0.6);
}
.weatherheader{
    padding: 0 5px 0 5px;
}
.weatherDT {
    text-align: center;
    background-color: rgba(255, 255, 255,0.3);
    font-size: 12px;
    position: relative;
    padding-top:5px;
    width: 100%;
    height: 25px; 
    border-radius: 0 0 50px 50px;
}

.weatherCity {
    padding: 5px 5px 0 5px;
    font-size: 16px;
}

.weatherIcon {
    height: 80px;
    position: relative;
    top: 20px;
    width: 80px;
    margin: 0 auto;
}

.weatherDesc{
    background-color: rgba(255, 255, 255,0.3);
    color: white;
    border-radius: 10px;
    padding: 5px;
    position: absolute;
    right: -30px;
    bottom: 6px;
    font-size: 14px;
}

.owi {
    font-size: 64px;
}

.wi {
    font-size: 16px;
}

.weatherInfos {
    display: inline-block;
    padding: 0 10px 10px 10px;
    margin-top: 10px;
}

.weatherInfo {
    color: #fff;
    float: left;
    height: 100%;
    text-align: center;
    margin-right: 10px;
}

.weatherInfo span {
    display: inline-block;
    font-size: 16px;
    margin-top: 10px;
}
</style>
