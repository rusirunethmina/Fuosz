<template>
   <div class="mt-10 sm:mt-0" v-show="isLoggedIn">
        <div class="">
            <div class="max-w-xl mx-auto overflow-hidden shadow sm:rounded-md">
                
                <!-- <form action="#" method="POST"> -->
                  <div class="">
                      
                    <div class="px-4 py-5 bg-white sm:p-6">
                      <!-- <div class="mt-10 mb-5"> -->
                        <p class="mb-5 text-xl font-bold ">Recipient Info</p>
                      <!-- </div> -->
                      
                        <div class="flex flex-col">
                          <div class="mb-3">
                              <label for="name" class="flex block space-x-2 text-xl font-medium text-gray-700">
                                <UserIcon class="w-3 h-3 mt-1 text-green-500 md:w-6 md:h-6" aria-hidden="true" />
                                <span>Name</span>
                              </label>
                              <input type="text" name="name" v-model="fullname" placeholder="John Doe" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                          </div>
                          <div class="mb-3">
                              <label for="phone" class="flex block space-x-2 text-xl font-medium text-gray-700">
                              <PhoneIcon class="w-3 h-3 mt-1 text-green-500 md:w-6 md:h-6" aria-hidden="true" />
                                <span>Phone</span>
                              </label>
                            <input type="tel" name="phone" v-model="phone" id="phone" placeholder="08000000000" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                          </div>
                          <div class="">
                            <label for="note" class="flex block space-x-2 text-xl font-medium text-gray-700">
                                <AnnotationIcon class="w-3 h-3 mt-1 text-green-500 md:w-6 md:h-6" aria-hidden="true" />
                                <span>Note</span>
                                </label>
                                <textarea id="about" name="about" v-model="note" rows="3" class="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="you@example.com" />
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
import { UserIcon, PhoneIcon, AnnotationIcon } from '@heroicons/vue/outline'
import Navigation from './Navigation.vue'
export default {
    components: {
        UserIcon,
        PhoneIcon,
        AnnotationIcon,
        Navigation
    },
     data () {
        return {
           
            isLoggedIn: false,
            fullname: null,
            phone: null,
            note: null
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

      if (localStorage.fullname) {
        this.fullname = localStorage.fullname;
      }

      if (localStorage.phone) {
        this.phone = localStorage.phone;
      }

      if (localStorage.note) {
        this.note = localStorage.note;
      }
    },

    watch: {
      fullname(newFullName) {
        localStorage.fullname = newFullName;
      },

      phone(newPhone) {
        localStorage.phone = newPhone;
      },
      
      note(newNote) {
        localStorage.note = newNote;
      }
    },

}
</script>