<template>
  <l-map  :zoom="zoom" :center="getMarkLatLon(userLocation.lat, userLocation.lon)">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

    <!-- Control -->
    <l-control position="bottomleft" >
      <aqiColorAxis />
    </l-control>
    <l-control position="topright" >
      <aqiInfoBox :aqiData="currentData" />
    </l-control>
    <l-control position="bottomright" >
      <weather :LatLon="selectLatLon" />
    </l-control>

    <!-- Marker -->
    <l-circle-marker
      v-for="mark in AQI_data" :key="mark.County + mark.SiteName + mark.Status" 
      :lat-lng="getMarkLatLon(mark.Latitude, mark.Longitude)"
      :radius="15"
      color="grey"
      :fill="true"
      :fillColor="getAQIColor(mark.AQI)"
      :fillOpacity="0.7"
      @click="markClick(mark)"
    >
      <l-popup :content="mark.SiteName"></l-popup>
    </l-circle-marker>
    <l-marker
        :lat-lng="[userLocation.lat, userLocation.lon]"
        :icon="icon" > </l-marker>
  </l-map>
</template>

<script>
// import * as Vue2Leaflet from 'vue2-leaflet'
import { LMap, LTileLayer, LMarker, LPopup, LCircleMarker, LIcon, LControl } from 'vue2-leaflet';
import aqiColorAxis from '../components/aqi-color-axis'
import aqiInfoBox from '../components/aqi-info-box'
import locationIcon from '../assets/locationIcon.svg'
import weather from '../components/current-weather'

export default {
  name: 'VueLeaflet',
  components: {
    LMap, LTileLayer, LMarker, LPopup, LCircleMarker, LIcon, LControl,
    aqiColorAxis, aqiInfoBox, weather,
  }, 
  props: ["userLocation"],
  data () {
    return {
      zoom: 12,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      AQI_data: {},
      circle: {
        center: [23.7, 121],
        radius: 6,
        color: 'red'
      },
      icon: L.icon({
        iconUrl: locationIcon,
        iconSize: [64, 64],
      }),
      currentData: {},
      selectLatLon: this.userLocation,
    }
  },
  mounted() {
    //get AQI data
    this.$axios.get("http://opendata2.epa.gov.tw/AQI.json")
      .then(response => {
        console.log(response);
        this.AQI_data = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  watch: { 
    userLocation: function(newVal, oldVal) {
      this.selectLatLon.lat = this.userLocation.lat;
      this.selectLatLon.lon = this.userLocation.lon;
    }
  },
  methods: {
    getMarkLatLon(lat, lon){
      return L.latLng(lat, lon);
    },
    getAQIColor: function(value){
      let colorStr = "grey";
      if (value === "") {
        return colorStr;
      }
            
      if (value >= 301) {
        colorStr = "purple";
      } else if (value >= 201) {
        colorStr = "brown";
      } else if (value >= 151) {
        colorStr = "red";
      } else if (value >= 101) {
        colorStr = "orange";
      } else if (value >= 51) {
        colorStr = "#FFFF66";
      } else {
        colorStr = "YellowGreen";
      }

      return colorStr;
    },
    markClick: function(mark){
      this.currentData = mark;
      this.selectLatLon = {
        lat: mark.Latitude, 
        lon: mark.Longitude
      }
    }
  },
}
</script>

<style>
  .vue2leaflet-map {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    position: absolute !important; 
  } 
</style>

