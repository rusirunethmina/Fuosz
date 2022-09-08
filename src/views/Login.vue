<template>
  <div class="container px-5 mx-auto mt-32 mb-5">
    <div class="">
      <div class="p-5 mx-auto rounded shadow-lg sm:p-12 md:w-1/4">
        <p class="mb-5 text-3xl font-semibold">Login</p>
        <form>
          <div class="block w-full mb-4">
              <span class="font-light text-gray-600">Email</span>
              <input type="email" name="email" 
              placeholder="mail@example.com" 
              v-model="details.email" 
              id="email"
              class="block w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
          </div>
          <div class="block w-full mb-4">
              <span class="font-light text-gray-600">Password</span>
              <input type="password" placeholder="********************" 
              name="password" 
              v-model="details.password" 
              id="password"
              class="block w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
              <p v-if="showError" class="text-center text-red-500">Email or Password is incorrect</p>
          </div>
          <div class="w-full mt-8">
            <button type="button" @click="login" class="w-full px-10 py-2 text-center text-white rounded bg-primary">
               Login
            </button>
          </div>
                <!-- focus:outline-none focus:shadow-outline-primary -->
        </form>
        <div class="flex justify-center mt-8">
          <p class="text-xs text-gray-600">Don't have an account?</p>
          <router-link to="/register" class="ml-2 text-xs text-gray-600 cursor-pointer">SignUp</router-link>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",

  data() {
    return {
      details: {
        email: null,
        password: null
      },
      showError: false
    };
  },
 
  computed: {
    ...mapGetters(["errors"])
  },

  mounted() {
    this.$store.commit("setErrors", {});
  },

  methods: {
    ...mapActions("auth", ["sendLoginRequest"]),

    login: function() {
      this.$store.commit('loading', true)
      // const User = new FormData();
      // User.append("email", this.details.email);
      // User.append("password", this.details.password);
      try {
        this.sendLoginRequest(this.details)
        // .then(() => {
          if(this.errors == false){
            this.$store.commit('loading', false)
            window.location.href = "/";
            this.showError  = false
          // })
          }
      } catch (error) {
          this.showError   = true
      }
    }
  }
};
</script>

