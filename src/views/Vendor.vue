<template>
  <div class="mb-5 vendor">
    <div class="max-w-full ">
       <img  v-if="vendor" v-bind:src="vendor.feature_image" class="w-full bg-center bg-cover" style="height: 400px">
    </div>
   
    <div class="container max-w-6xl px-5 mx-auto md:mt-10" v-if="vendor">
      <div class="mb-5">
          
        <div class="flex flex-col mt-3">
          <div class="flex space-x-3">
            <img  v-if="vendor" v-bind:src="vendor.logo" class="rounded-md w-14 h-14">
             <p class="self-center pt-2 text-4xl font-light sm:mt-0 leading-large ">{{ vendor.name }}</p>
          </div>
            
             <div class="flex flex-col md:space-x-3 md:flex-row ">
               <p class="flex py-3">
                <span class="font-light " v-for="star in vendor.rating" :key="star.id">
                  <starIcon {{ star }} class="self-center w-3 h-3 text-yellow-400 md:mt-0 md:w-6 md:h-6" aria-hidden="true" />
                </span>
              </p>
          
              <p class="flex py-3 font-light">
                <LocationMarkerIcon class="w-6 h-6 text-gray-600" aria-hidden="true" />
                <span class="px-1">{{ vendor.address }}</span>
              </p>
              <p class="flex py-3 font-light">
                <PhoneIcon class="w-6 h-6 text-gray-600" aria-hidden="true" />
                <span class="px-1">{{ vendor.phone }}</span>
              </p>
              <p class="flex py-3 font-light">
                <MailIcon class="w-6 h-6 text-gray-600" aria-hidden="true" />
                <span class="px-1">{{ vendor.email }}</span>
              </p>
             </div>
            
        </div>
        <div class="flex flex-col font-light md:space-x-5 md:flex-row ">
          <p class="mb-2">Min Order: {{ currency }}{{ vendor.min_order ? vendor.min_order : '0.00'}}</p>
          <p class="mb-2">Max Order: {{ currency }}{{ vendor.max_order ? vendor.max_order : '0.00'}}</p>
          <span class="w-24 px-3 py-1 mb-2 text-center text-white bg-green-600 rounded-md shadow-sm " v-if="vendor.is_open">Opened</span>
          <span class="w-24 px-3 py-1 mb-2 text-center text-white bg-gray-500 rounded-md shadow-sm" v-else>Closed</span>
          <span class="w-24 px-3 py-1 mb-2 text-center text-white bg-green-500 rounded-md shadow-sm" v-if="vendor.pickup == 1">Pickup</span>
          <span class="w-24 px-3 py-1 mb-2 text-center text-white bg-yellow-300 rounded-md shadow-sm" v-if="vendor.delivery == 1">Delivery</span>
        </div>
        <p class="mt-2 text-sm text-gray-500">{{ vendor.description }}</p>
        <MenuTab/>
        
      </div>
    </div>
    <!-- footer -->
    <!-- <Footer/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
// import Footer from '@/components/Footer.vue'
import MenuTab from '@/components/MenuTab.vue'
import { LocationMarkerIcon, PhoneIcon, MailIcon } from '@heroicons/vue/outline'
import { StarIcon } from '@heroicons/vue/solid'

export default {
  name: 'vendor',
  components: {
    // Footer,
    MenuTab,
    LocationMarkerIcon,
    StarIcon,
    PhoneIcon,
    MailIcon
  },
  data () {
    return {
      vendor: null,
      currency: null,
    }
  },
  mounted () {
    this.getCurrency()
    let base_url = this.$store.state.baseUrl
    // var self = this
    this.$store.commit('loading', true)
    axios.get(base_url+'api/vendors/' + this.$route.params.id)
    .then((response) => {
      this.$store.commit('loading', false)
      this.vendor = response.data})
    .catch(error => console.log(error))
  },
  methods: {
    getCurrency() {
      let base_url = this.$store.state.baseUrl;
        let setting;
        axios.get(base_url+'api/app/settings')
        .then( (response) => {
            setting = response.data;
            this.currency = setting.strings.currency
        })
        return this.currency;
    },
  }
}
</script>
