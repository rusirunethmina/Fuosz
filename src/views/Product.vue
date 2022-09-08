<template>
  <div class="product">
    <div class="container max-w-6xl px-5 mx-auto mt-32 mb-5" v-if="product">
        <div class="grid grid-cols-6 gap-2">
            <div class="col-span-full md:col-span-4 md:mr-10">
                <img  v-if="product.photo" v-bind:src="product.photo" class="rounded-lg md:h-full">
            </div>
            <div class="md:col-start-5 md:col-end-7 col-span-full">
                <p class="mt-2 mt-5 text-4xl font-light sm:mt-0 leading-large ">{{ product.name }}</p>
                <span v-if="product.discount_price > 0">
                    <p class="pt-5 mt-3 text-2xl tracking-wide">{{ currency }}{{ product.discount_price.toFixed(2) }}</p>
                <p class="pb-5 mt-3 text-2xl tracking-wide">{{ currency }}<span class="line-through">{{ product.price.toFixed(2) }}</span> </p>
                </span>
                <span v-else>
                    <p class="pt-5 mt-3 text-2xl tracking-wide">{{ currency }}{{ product.price.toFixed(2) }}</p>
                </span>
                <!-- <p class="pb-5 mt-3 text-2xl tracking-wide">{{ currency }}<span class="line-through">{{ product.price.toFixed(2) }}</span> </p> -->
                <p class="pb-5 leading-7 text-gray-600">{{ product.description }}</p>
                <!-- <p class="my-5 text-sm font-bold text-black md:text-xl md:mb-36"></p> -->
                    
                <div class="flex mb-20 space-x-4">
                    <div class="p-2 text-sm font-light text-black text-gray-500 border border-green-600" v-if="product.deliverable == 1">Deliverable</div>
                    <div class="p-2 text-xs font-light text-black text-gray-500 border border-red-600" v-if="product.deliverable == 0">Not Deliverable</div>
                    <div class="p-2 text-xs font-light text-black text-gray-500 border border-gray-500 ">{{ product.capacity }} {{ product.unit }}</div>
                    <div class="p-2 text-xs font-light text-black text-gray-500 border border-gray-500">{{ product.package_count }} Item(s)</div>
                </div>
                <div class="flex">
                    <p class="flex items-center px-2 text-xs">Quantity:</p>
                    <!-- <div> -->
                        <div class="flex items-center">
                            <button
                            class="p-2 m-2 font-extrabold text-green-500 transition duration-500 ease-in-out transform border-transparent cursor-pointer rounded-xl hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                            @click="decrement()">
                            -
                            </button>
                            <div class="w-10 h-10 overflow-hidden bg-gray-100 shadow-md rounded-xl">
                            <input class="w-full h-full font-bold text-center text-1xl"
                            v-model="quantity" />
                            </div>
                            <button
                            class="p-2 m-2 font-extrabold text-green-500 transition duration-500 ease-in-out transform rounded cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                            @click="increment(product)">
                            +
                            </button>
                        </div>
                    <!-- </div> -->
                </div>
                <div class=""  v-if="product.available_qty > 0">
                    <p class="my-5 text-xs">
                        Instock: <span>{{ product.available_qty }}</span>
                    </p>
                </div>
                <div v-else>
                    <p class="my-5 text-xs">
                        Out of stock
                    </p>
                </div>
                 <div class="mt-1"> 
                    <button @click="addToCart(product)" class="w-full px-3 py-5 mr-5 text-xs font-semibold text-white bg-primary md:py-4">Add {{ currency }} {{ totalPrice.toFixed(2) }}</button>
                </div>
            </div>
        </div>
        <div class="mt-20" v-if="product.option_groups">
            <p class="mb-3 text-4xl">Options</p>
            <p class="mt-4 text-sm text-gray-600">Select options to add them to the product</p>

            <div  v-for="option_group in product.option_groups" :key="option_group.id">
                <p class="mt-4 text-xs font-medium md:text-xl">{{ option_group.name }}</p>
                <div class="grid gap-4 md:grid-cols-3">
                    <div class="mt-5 bg-white shadow-md md:h-32 rounded-xl md:w-96" v-for="(option, index) in option_group.options" :key="index">
                        <div class="flex mx-auto">
                            <div class="flex-shrink-0">
                                <img class="object-cover w-24 h-24 md:h-28 md:w-28"  v-if="option" v-bind:src="option.photo" alt="">
                            </div>
                            <div class="self-center px-2 pt-2 md:p-4">
                                <div class="text-xs font-semibold text-black md:text-xl">{{ option.name }}</div>
                                <p class="text-xs text-gray-500 md:text-base">{{ option.description }}</p>
                            </div>
                            <div class="self-center p-3">
                                <p class="text-sm text-center text-black md:text-xl">{{ currency }}{{ option.price }}</p>
                            </div>
                            <div class="self-center p-2">
                                <label class="md:items-start md:justify-start md:flex">
                                    <div class="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500">
                                        <input type="checkbox" class="absolute opacity-0" v-model="selectedOption" :value="option">
                                        <svg class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                    </div>
                                </label>
                                <!-- <div v-if="selectedOption"> -->
                                <!-- checked: {{ selectedOption[index] }} -->
                                <!-- </div> -->
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Recommended/>
  </div>
</template>

<script>
import axios from 'axios'
import Recommended from '@/components/Recommended.vue'
import { notify } from "@kyvg/vue3-notification"
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
export default {
    name: 'product',
    components: {
        Recommended,
    },
    data () {
      return {
          product: null,
          currency: null,
          quantity: 1,
          selectedOption: [], 
          animationDown :{
              translateY:'translateY(-100%)',
              // eslint-disable-next-line no-dupe-keys
              translateY:'translateY(100%)'
          },
      }
    },
    computed: {
        totalPrice() {

            let total
            if(this.product.discount_price != 0)
            {
                total  = Number(this.quantity) * Number(this.product.discount_price)
            }else{
                total =  Number(this.quantity) * Number(this.product.price)
            }
            
            if(this.selectedOption){
                this.selectedOption.forEach((item, i) => {
                    total += Number(this.selectedOption[i].price);
                    console.log(total)
                })
            }
          return total;
        },
    },
    mounted () {
        let base_url = this.$store.state.baseUrl
      var self = this
      axios.get(base_url+'api/products/' + this.$route.params.id)
      .then(response => (self.product = response.data))
      .catch(error => console.log(error))
    },

    created() {
      this.getCurrency();
    },

     methods: {

         getCurrency() {
             let base_url = this.$store.state.baseUrl
             this.$store.commit('loading', true)
            let setting;
            axios.get(base_url+'api/app/settings')
            .then( (response) => {
                this.$store.commit('loading', false)
                setting = response.data;
                this.currency = setting.strings.currency
            })

            return this.currency;
        },

        addToCart(product, quantity = this.quantity, selectedOption = this.selectedOption) {
            // console.log(selectedOption)
            if(product.available_qty >= 1){
                if(selectedOption)
                {
                    this.$store.commit('addToCart',{ product, quantity, selectedOption});
                }else{
                    this.$store.commit('addToCart',{ product, quantity});
                }
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Product out of stock',
                })
            }
        },

        increment(product) {
            if(this.quantity >= product.available_qty){
               notify({
                    type: "error",
                    title: "Cart",
                    text: "Product out of stock",
                });
            }else {
                 this.quantity++;
                 if(product.discount_price != 0) {
                     this.totalPrice = product.discount_price + this.quantity;
                 }else{
                      this.totalPrice = product.price + this.quantity;
                 }
               
            }
        },

        decrement() {
            if(this.quantity === 1)
            {
                notify({
                    type: "error",
                    title: "Cart",
                    text: "You cannot add 0 product",
                });
            }else{
                this.quantity--
            }
        },

    }
}
</script>

