<template>
  <l-map  :zoom="zoom" :center="getMarkLatLon(currentLocation.lat, currentLocation.lon)">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <!-- <l-marker v-for="mark in AQI_data" :key="mark.County + mark.SiteName + mark.Status" :lat-lng="getMarkLatLon(mark.Latitude, mark.Longitude)">
      <l-popup :content="mark.SiteName"></l-popup>
    </l-marker> -->
    <l-circle-marker
      v-for="mark in AQI_data" :key="mark.County + mark.SiteName + mark.Status" 
      :lat-lng="getMarkLatLon(mark.Latitude, mark.Longitude)"
      :radius="15"
      :color="getAQIColor(mark.AQI)"
      :fill="true"
      :fillColor="getAQIColor(mark.AQI)"
      :fillOpacity="0.7"
    >
      <l-popup :content="mark.SiteName"></l-popup>
    </l-circle-marker>
    <l-marker
        :lat-lng="[currentLocation.lat, currentLocation.lon]"
        :icon="icon" > </l-marker>
  </l-map>
</template>

<script>
// import * as Vue2Leaflet from 'vue2-leaflet'
import { LMap, LTileLayer, LMarker, LPopup, LCircleMarker, LIcon } from 'vue2-leaflet';
import locationIcon from '../assets/locationIcon.svg'

export default {
  name: 'VueLeaflet',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LCircleMarker,
    LIcon,
  }, 
  props: ["currentLocation"],
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

