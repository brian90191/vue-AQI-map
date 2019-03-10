<template>
    
</template>

<script>
export default {
  props: ["currentLocation"],
  data() {
    return {
      owmUrl: "http://api.openweathermap.org/data/2.5/weather?",
      ownAppid: "d1a482530f24a5061dbe554ca1a11a80",
    }
  },
  mounted() {
    //get weather data
    let weatherAPI = `${this.owmUrl}lang=ZH_TW&lat=${this.currentLocation.lat}&lon=${this.currentLocation.lon}&appid=${this.ownAppid}`;
    this.$axios.get(weatherAPI)
      .then(response => {
        console.log(response);
        this.AQI_data = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
}
</script>
