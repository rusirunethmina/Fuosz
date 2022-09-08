<template>
    <div class="container max-w-6xl px-5 mx-auto mb-5">
        <p class="text-2xl text-center text-gray-700 md:text-4xl">My Orders</p>
        <div  v-if="orders">
             <div class="" v-if="orders.length <= 0">
                <p class="mt-5 text-center">You have no orders.</p>  
            </div>
            <div class="flex flex-col mt-8" v-else>
                <div v-for="order in orders" :key="order.id">
                    <div class="py-5 border-b">
                        <a :href="`order/details/${order.id}/`+sanitizeTitle(`${order.code}`)" 
                            class="flex items-center justify-between" 
                            v-for="product in order.products" :key="product.id"
                        >
                            <!-- <p class="text-black">{{ product.name }}</p> -->
                            <div :aria-label="order.vendor.name" class="">
                                <img v-if="order" v-bind:src="order.vendor.feature_image" class="w-32 h-12 m-0 md:h-16" alt="">
                            </div>
                            <div :aria-label="order.vendor.name"  class="w-32 p-2 m-0 text-center text-gray-600 ">
                                <p class="font-semibold text-smallest md:text-base "> {{ order.vendor.name }}</p>
                                <p class=" md:text-base text-smallest"> {{ product.quantity }} Product(s)</p>
                            </div>
                            <div class="w-32 p-2 m-0 text-center text-gray-600 ">
                                <p class="text-smallest md:text-base">#{{ order.code }}</p>
                                <p class="md:text-xs text-smallest">{{ order.formatted_date }}</p>
                            </div>
                            <div class="w-32 p-2 m-0 text-center" v-if="order">
                                <p class="font-semibold text-center md:text-base text-smallest ">{{ currency }} {{ order.total.toFixed(2) }}</p>
                                <p class="text-center text-gray-500 md:text-base text-smallest " v-if="order.status == 'cancelled'">{{ order.status }}</p>
                                <p class="text-center text-green-500 md:text-base text-smallest " v-else-if="order.status == 'delivered'">{{ order.status }}</p>
                                <p class="text-center text-blue-500 md:text-base text-smallest " v-else>{{ order.status }}</p>
                                <!-- <p class="px-4 py-2 text-xs text-center text-yellow-500 rounded-md " v-else>{{ order.status }}</p> -->
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <!-- <a href="{{orders.next_page_url}}"> Next</a> -->
        </div>
        
        <!-- <div class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div class="flex justify-between flex-1 sm:hidden">
            <a @click="prevPage" class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </a>
            <a @click="nextPage" class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </a>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                {{ ' ' }}
                <span class="font-medium">1</span>
                {{ ' ' }}
                to
                {{ ' ' }}
                <span class="font-medium">10</span>
                {{ ' ' }}
                of
                {{ ' ' }}
                <span class="font-medium">97</span>
                {{ ' ' }}
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button :class="page === 1 ? ' relative disabled:bg-gray-300 inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-l-md hover:bg-gray-50' : 'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50'" @click="prevPage" class="">
                  <span class="sr-only">Previous</span>
                  <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
                </button>
                
                <button @click="nextPage" class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
                  <span class="sr-only">Next</span>
                  <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>   -->
    </div> 
</template>
<script>
    import axios from 'axios'
    // import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
    export default {
        name: 'orders',
        // components: {
        //     ChevronLeftIcon,
        //     ChevronRightIcon,
        // },
        data() {
            return {
                orders: null,
                AuthStr: 'Bearer ' + localStorage.getItem('authToken'),
                currency: null,
                pageNo: 1,
                page: 1,
                perPage: 20
            }
        },

        // computed: {
        //     showRepos () {
        //         let start = (this.page - 1) * this.perPage
        //         let end = start + this.perPage
        //         this.$store.commit('loading', false)
        //         return this.orders.slice(start, end)
        //     },
        // },

        mounted() {
            
            this.getCurrency()
            
            let base_url = this.$store.state.baseUrl

            this.$store.commit('loading', true)
            // ?page='+this.pageNo
            axios.get(base_url+'api/orders', { 
            'headers': { 'Authorization': this.AuthStr } })
            .then((response) => {
                this.$store.commit('loading', false),
                this.orders = response.data.data
                // console.log(response)
            })
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

            // prevPage () {
            //     this.$store.commit('loading', true),
            //     this.page--
            // },

            // nextPage () {
            //     this.$store.commit('loading', true),
            //     this.page++
            // },
    
            sanitizeTitle(title) {
                var slug = "";
                // Change to lower case
                var titleLower = title.toLowerCase();
                // Letter "e"
                slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
                // Letter "a"
                slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
                // Letter "o"
                slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
                // Letter "u"
                slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
                // Letter "d"
                slug = slug.replace(/đ/gi, 'd');
                // Trim the last whitespace
                slug = slug.replace(/\s*$/g, '');
                // Change whitespace to "-"
                slug = slug.replace(/\s+/g, '-');
                
                return slug;
            },
        }
    }
</script>