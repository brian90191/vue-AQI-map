<template>
  <div id="app">
    <leafletMap :userLocation="userLocation" />
  </div>
</template>

<script>
import leafletMap from './components/leaflet-map'

export default {
  name: 'app',
  components: {
    leafletMap,
  },
  data () {
    return {
      userLocation: {
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
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.userLocation.lat = position.coords.latitude;
          this.userLocation.lon = position.coords.longitude;
        });
      }
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
