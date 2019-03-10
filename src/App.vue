<template>
  <div id="app">
    <leafletMap/>
  </div>
</template>

<script>
import leafletMap from './components/leaflet-map'

export default {
  name: 'app',
  components: {
    leafletMap
  },
  data () {
    return {
    }
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
