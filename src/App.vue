<template>
  <div id="app">
    <leafletMap :currentLocation="currentLocation" />
    <weather :currentLocation="currentLocation" />
  </div>
</template>

<script>
import leafletMap from './components/leaflet-map'
import weather from './components/current-weather'

export default {
  name: 'app',
  components: {
    leafletMap, weather
  },
  data () {
    return {
      currentLocation: {
        lat: 23.7,
        lon: 121
      },
    }
  },
  mounted() {
    //get user's location
    this.getCurrentLocation();
  },
  methods: {
    getMarkLatLon(lat, lon){
      return L.latLng(lat, lon);
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      }
    },
    showPosition: function(position){
      this.currentLocation.lat = position.coords.latitude;
      this.currentLocation.lon = position.coords.longitude;
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
