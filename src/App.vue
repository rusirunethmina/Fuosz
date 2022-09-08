<template>
<div id="app">
  
  <div class="flex flex-col flex-grow w-screen max-w-full min-h-screen text-base font-eina">
    
    <Nav/>
    <!-- <div class="flex items-center justify-center spin-content" v-if="loading">
      <grid-loader class="" :loading="loading"></grid-loader>
    </div> -->
      <div class="font-eina mt-14 md:mt-22">
        <notifications position="top right"/>
        <router-view/>
      </div>
    <Footer/>
  </div>
      
</div>
</template>


<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import GridLoader from 'vue-spinner/src/GridLoader.vue'
export default {
  name: 'Home',
  components: {
    Nav,
    Footer,
    GridLoader
  },
  computed: {
     loading() {
       return this.$store.getters.loading
     }
   }
}
</script>
<style lang="scss" scoped>
html,body{
  font-family: 'Montserrat', sans-serif;

}

.spin-content {
  background-color: #fff;
  padding: 30px;
  align-items: center;
}
</style>
