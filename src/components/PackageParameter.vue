<template>
    <div class="mt-10 sm:mt-0" v-show="isLoggedIn">
      <div class="max-w-xl mx-auto overflow-hidden shadow sm:rounded-md">
        <div class="">
          <!-- <form action="#" method="POST"> -->
            <div class="overflow-hidden shadow sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <p class="mb-5 text-xl font-bold ">Package Parameters</p>
                <div class="flex flex-col">
                    <div class="mb-3">
                        <label for="weight" class="flex block space-x-2 text-xl font-medium text-gray-700">
                          <span>Weight(kg)</span>
                        </label>
                        <input type="number" v-model="weight" name="weight" id="weight" placeholder="10" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                   
                    <div class="mb-3">
                      <label for="width" class="flex block space-x-2 text-xl font-medium text-gray-700">
                        <span>Width(cm)</span>
                      </label>
                      <input type="number" v-model="width" name="width" id="width" placeholder="10" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div class="mb-3">
                      <label for="height" class="flex block space-x-2 text-xl font-medium text-gray-700">
                        <span>Height(cm)</span>
                      </label>
                      <input type="number" v-model="height" name="height" id="height" placeholder="10" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    
                     <div class="">
                        <label for="plength" class="flex block space-x-2 text-xl font-medium text-gray-700">
                          Length(cm)
                        </label>
                      <input type="number" v-model="plength" name="plength" id="plength" placeholder="10" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
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
import Navigation from './Navigation.vue'
export default {
    components: {
      Navigation
    },
    data () {
        return {
          isLoggedIn: false,
          user: null,
          weight: 0,
          plength: 0,
          width: 0,
          height: 0
        }
    },
    mounted() {

      if (localStorage.getItem("authToken")) {
        this.isLoggedIn = true;
        this.user = JSON.parse(localStorage.getItem("user"))
        }

      if(this.isLoggedIn == false) {
            this.$router.push("/login");
      }

      if (localStorage.weight) {
        this.weight = localStorage.weight;
      }

      if (localStorage.plength) {
        this.plength = localStorage.plength
      }

      if (localStorage.width) {
        this.width = localStorage.width;
      }

      if (localStorage.height) {
        this.height = localStorage.height;
      }
    },

    watch: {
      weight(newWeight) {
        localStorage.weight = newWeight;
      },

      plength(newLength) {
        localStorage.plength = newLength;
      },
      
      width(newWIdth) {
        localStorage.width = newWIdth;
      },

      height(newHeight) {
        localStorage.height = newHeight;
      },

    },
}
</script>