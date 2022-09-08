<template>
  <div class="container px-5 mx-auto mt-32 mb-5">
    <div class="p-5 mx-auto rounded shadow-lg sm:p-12 md:w-1/4">
        <form @submit.prevent="submit">
          <p class="mb-5 text-3xl font-semibold">Register</p>
          
          <div class="block mb-4">
              <span class="font-light text-gray-600">Name</span>
              <input type="text" placeholder="John Doe"
              v-model="details.name" 
              id="name"
              class="block w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
             
          </div>
          <div class="block mb-4">
              <span class="font-light text-gray-600">Email</span>
              <input type="email"
              placeholder="mail@example.com"
              id="email"
              v-model="details.email" class="block w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
             
          </div>
          <div class="block mb-4">
              <span class="font-light text-gray-600">Phone</span>
              <vue-tel-input v-model="details.phone" @change="countryChanged"></vue-tel-input>
              <!-- <div class="flex flex-col">
               
                  <input type="tel"
                  v-model="details.phone" 
                  placeholder="+233000000000000" 
                  id="phone"
                  class="block w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
              </div>  -->
          </div>
          <div class="block mb-4">
              <span class="font-light text-gray-600">Password</span>
              <input type="password"
              v-model="details.password" 
              placeholder="********************" 
              id="password"
              class="block w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
              <!-- <p v-if="setErrors" class="text-center text-red-400" id="error"></p> -->
          </div>
          <div class="mt-8">
            <button type="button" @click="register" class="w-full px-10 py-2 text-center text-white rounded bg-primary "> Register</button>
          </div>
                <!-- focus:outline-none focus:shadow-outline-primary -->
        </form>
        <div class="flex justify-center mt-8">
          <p class="text-xs text-gray-600">Already have an account?</p>
          <router-link to="/login" class="ml-2 text-xs text-gray-600 cursor-pointer">Login</router-link>
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import { VueTelInput } from 'vue-tel-input'
export default {
  name: "Home",
  components: {
    VueTelInput,
  },
  data: function() {
    return {
      details: {
        name: null,
        email: null,
        password: null,
        phone: null,
        countryCode: null,
        
      }
    };
  },

  computed: {
    ...mapGetters(["errors"])
  },

  mounted() {
    this.$store.commit("setErrors", {});
   
  },

  methods: {

    countryChanged(country) {
      this.countryCode = country.dialCode
      console.log(this.countryCode)
      console.log(this.details.phone)
    },
    
    ...mapActions("auth", ["sendRegisterRequest"]),

    register: function() {
      this.$store.commit('loading', true)
      this.sendRegisterRequest(this.details, ).then(() => {
        this.$store.commit('loading', false)
      });
    },
  }
};
</script>
