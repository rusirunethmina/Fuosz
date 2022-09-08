<template>
  <div class="mt-10 sm:mt-0" v-show="isLoggedIn">
      <div class="max-w-xl mx-auto overflow-hidden shadow sm:rounded-md">
          <div class="">
              
              <!-- <form action="#" method="POST"> -->
                <div class="">
                    
                  <div class="px-4 py-5 bg-white sm:p-6">
                      <p class="mb-5 text-xl font-bold ">Package Type</p>
                    <div class="flex flex-col">
                      <div class="mb-3">
                        <label for="package" class="block text-sm font-medium text-gray-700">Package Types</label>
                        <select id="package" v-model="packageType" @change="getCouriers" name="packageType" autocomplete="packages" class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="0">Select a package type</option>
                          <option v-for="option in packageTypes" :value="option.id" v-bind:key="option.id">
                              {{ option.name }}
                          </option>
                        </select>
                      </div>
                      <div class="">
                        <label for="package" class="block text-sm font-medium text-gray-700">Courier Vendors</label>
                        <select id="package" v-model="courier" name="package" autocomplete="packages" class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="0">Select a courier vendor</option>
                          <option v-for="vendor in couriers" :value="vendor.id" v-bind:key="vendor.id">
                              {{ vendor.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                      <div class="mt-10 mb-5">
                        <p class="text-xl font-bold">Delivery Info</p>
                      </div>
                     <div class="flex flex-col">
                      <div class="mb-3">
                        <label for="from" class="space-x-2 text-xl font-medium text-gray-700">
                          <div class="flex justify-between">
                            <div class="flex space-x-2">
                              <TruckIcon class="w-3 h-3 mt-1 text-green-500 md:w-6 md:h-6" aria-hidden="true" />
                              <span>From</span>
                            </div>
                            <a href="/profile" class="text-sm font-medium text-green-500 hover:underline">Add address</a>
                          </div>
                        </label>
                        <select id="from" v-model="from" class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <!-- <option value="0">Select a delivery address</option> -->
                          <option v-for="from in addresses" :value="from.id" v-bind:key="from.id">
                              {{ from.name }} [{{ from.address}}]
                          </option>
                        </select>
                        <!-- <input type="text" name="from" id="from" v-model="from" placeholder="Pickup" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /> -->
                      </div>
                      <div class="mb-3">
                          <label for="to" class="flex block space-x-2 text-xl font-medium text-gray-700">
                            <LocationMarkerIcon class="w-3 h-3 mt-1 text-red-500 md:w-6 md:h-6" aria-hidden="true" />
                            <span>To</span>
                          </label>
                          <select id="to" v-model="to" class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <!-- <option>Select a delivery address</option> -->
                          <option v-for="to in addresses" :value="to.id" v-bind:key="to.id">
                              {{ to.name }} [{{ to.address}}]
                          </option>
                        </select>
                        <!-- <input type="text" name="to" v-model="to" id="to" placeholder="Dropoff" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /> -->
                      </div>
                      <div class="flex justify-between">
                        <div class="mb-3">
                          <label for="date" class="flex block space-x-2 text-xl font-medium text-gray-700">
                              <CalendarIcon class="w-3 h-3 mt-1 text-green-500 md:w-6 md:h-6" aria-hidden="true" />
                              <span>Date</span>
                              </label>
                          <input type="date" name="date" id="date" v-model="date" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div class="">
                          <label for="time" class="flex block space-x-2 text-xl font-medium text-gray-700">
                              <ClockIcon class="w-3 h-3 mt-1 text-green-500 md:w-6 md:h-6" aria-hidden="true" />
                              <span>Time</span>
                            </label>
                          <input type="time" name="time" id="time" v-model="time" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                    <Navigation></Navigation>
                  </div>
                </div>
              <!-- </form> -->
          </div>
          
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import { TruckIcon, ClockIcon, CalendarIcon } from '@heroicons/vue/outline'
import { LocationMarkerIcon } from '@heroicons/vue/solid'
import Navigation from './Navigation.vue'
// import { notify } from "@kyvg/vue3-notification";
export default {
    components: {
        LocationMarkerIcon,
        TruckIcon,
        ClockIcon,
        CalendarIcon,
        Navigation
    },
    data () {
        return {
          packageTypes: [],
          couriers: [],
          packageType: 0,
          courier:0,
          isLoggedIn: false,
          user: null,
          addresses: null,
          showModal: false,
          // package_type: '',
          // courier_services: '',
          from: '',
          to: '',
          date: '',
          time: '',
          AuthStr : 'Bearer ' + localStorage.getItem('authToken'),
        }
    },

    mounted() {

      let base_url = this.$store.state.baseUrl;
      axios.get(base_url+'api/delivery/addresses', { 
      'headers': { 'Authorization': this.AuthStr } })
      .then(response => (this.addresses = response.data.data))
      .catch(error => console.log(error))
      if (localStorage.getItem("authToken")) {
      this.isLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem("user"))
      }
      if(this.isLoggedIn == false) {
          this.$router.push("/login");
      }

      //localstore for fields
      if (localStorage.packageType) {
        this.packageType = localStorage.packageType;
      }

      if (localStorage.courier) {
        this.courier = localStorage.courier;
      }

      if (localStorage.from) {
        this.from = localStorage.from;
      }

      if (localStorage.to) {
        this.to = localStorage.to;
      }

      if (localStorage.date) {
        this.date = localStorage.date;
      }

      if (localStorage.time) {
        this.time = localStorage.time;
      }
    },

    watch: {
      packageType(newPackage) {
        localStorage.packageType = newPackage;
      },

      courier(newCourier) {
        localStorage.courier = newCourier;
      },

      from(newfrom) {
        localStorage.from = newfrom;
      },

      to(newTo) {
        localStorage.to = newTo;
      },

      date(newDate) {
        localStorage.date = newDate;
      },

      time(newTime) {
        localStorage.time = newTime;
      },
    },


    methods: {

        getPackageTypes() {
          let base_url = this.$store.state.baseUrl;
          this.$store.commit('loading', true)
            axios.get(base_url+'api/package/types')
            .then(function (response) {
              this.$store.commit('loading', false)
                this.packageTypes = response.data;
            }.bind(this));
        },
        
        getCouriers() {
          let base_url = this.$store.state.baseUrl;
          this.$store.commit('loading', true)
          axios.get(base_url+'api/vendors?type=package&package_type_id=1', {params: {package_type_id: this.packageType}})
          .then(function(response){
            this.$store.commit('loading', false)
              this.couriers = response.data.data;
          }.bind(this));
        }

    },

    created: function(){
        this.getPackageTypes()
    },
    
    
}
</script>