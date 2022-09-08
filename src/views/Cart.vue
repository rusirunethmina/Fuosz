<template>
    <div class="cart">
        <section class="container max-w-6xl px-5 mx-auto mt-32 mb-5">
            <p class="mb-5 text-5xl font-light md:mb-16">Your Cart</p>
            <div class="" v-if="this.$store.state.cart.length <= 0">
                <p class="mb-5">No items in cart.</p>  
            </div>
            <div class="grid gap-4 md:grid-cols-3" v-else>
                <div class="md:col-span-2">
                    <div class="px-5 py-3 mb-5 shadow-md md:justify-between rounded-xl md:flex md:space-x-20" v-for="product in products" :key="product.id"> 
                        <a :aria-label="product.name" :href="`product/${product.id}/`+sanitizeTitle(`${product.name}`)">
                            <img  v-if="product" v-bind:src="product.photo" class="mt-3 md:h-16">
                        </a>
                        <a :aria-label="product.name" :href="`product/${product.id}/`+sanitizeTitle(`${product.name}`)">
                            <div class="flex flex-col self-center"> 
                                <p class="flex m-0 mt-5 text-gray-600 md:mt-0 ">{{ product.name }}</p>
                                <p class="mt-2 text-xs text-gray-600 ">{{ product.vendor.name }}</p>
                            </div>
                        </a>
                        
                        
                         <div class="flex flex-row self-center space-x-2">
                            <p class="flex self-center text-xs ">Quantity:</p>
                            <p class="text-xs font-semibold">{{ product.quantity }}</p>
                            <!-- <div class="flex md:items-center">
                                <button
                                class="p-2 m-2 font-extrabold text-green-500 transition duration-500 ease-in-out transform border-transparent cursor-pointer rounded-xl hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                                @click="decrement(product)">
                                -
                                </button>
                                <div class="w-10 h-10 overflow-hidden bg-gray-100 shadow-md rounded-xl">
                                <input class="w-full h-full font-bold text-center text-1xl" v-model="product.quantity" event.target.value/>
                                </div>
                                <button
                                class="p-2 m-2 font-extrabold text-green-500 transition duration-500 ease-in-out transform rounded cursor-pointer md:p-2 md:m-2 hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                                @click="increment(product)">
                                +
                                </button>
                            </div> -->
                        </div>
                        <div class="flex flex-col self-center">
                             <div class="flex justify-between space-x-2">
                                 <p class="text-xs">Price:</p>
                                    <span v-if="product.discount_price > 0">
                                        <p class="text-sm text-gray-600">{{ currency }}{{ product.discount_price.toFixed(2) }}</p>
                                        <!-- <p class="text-sm text-gray-600">{{ currency }}<span class="line-through">{{ product.price.toFixed(2) }}</span> </p> -->
                                    </span>
                                    <span v-else>
                                        <p class="text-sm text-gray-600">{{ currency }}{{ product.price.toFixed(2) }}</p>
                                    </span>
                                 <!-- <p class="text-sm text-gray-600">{{ currency }}{{ product.discount_price.toFixed(2) }}</p> -->
                             </div>
                             <div class="flex justify-between space-x-2">
                                 <p class="text-xs">Total Product Price:</p>
                                 <p class="flex self-center text-sm text-gray-600">{{ currency }}{{ product ? product.totalPrice.toFixed(2) : '' }}</p>
                             </div>
                             <div v-if="product.selectedOption">
                                 <p class="text-xs" v-if="product.selectedOption.length == 0">No Extras</p>
                                 <p class="text-xs underline" v-if="product.selectedOption.length != 0">Extras:</p>
                                <div class="flex flex-col">
                                    <div class="flex justify-between space-x-2">
                                        <p class="text-xs" v-for="option in product.selectedOption" :key="option.id">{{ option.name }}</p>
                                    
                                    </div>
                                    <div class="flex justify-between space-x-2">
                                        <p class="text-sm text-gray-600" v-for="option in product.selectedOption" :key="option.id">{{ currency }} {{ option.price }}</p>
                                    </div>
                                    
                                </div>
                             </div>
                             
                        </div>
                       
                    </div>
                </div>
                
                <div class="md:col-span-1" v-show="products">
                    <p class="py-3 text-sm font-semibold text-gray-600 md:mt-0">Order Summary</p>
                    <div class="font-bold divide-y divide-black">
                        <p class="text-xs font-light text-gray-600 md:mb-3 md:mt-0">This subtotal doesn't include the delivery or pickup cost</p>
                        <div></div>
                    </div>
                    <div class="flex justify-between mt-4">
                        <p class="text-sm font-light text-gray-600">Total Item(s)</p>
                        <p class="font-bold text-black">{{ cartItemCount }}</p>
                    </div>
                    <div class="flex justify-between mt-1">
                        <p class="text-sm font-light text-gray-600">SubTotal</p>
                        <span v-if="cartSubTotal">
                        <p class="font-bold text-black">{{ currency }} {{ cartSubTotal.toFixed(2) }}</p>
                        </span>
                    </div>
                    <div class="flex justify-between mt-1">
                        <p class="text-sm font-light text-gray-600">Discount</p>
                        <p class="font-bold text-black" v-if="discount">

                            <span v-if="discount.percentage == 1">%</span>
                            <span v-else>{{ currency }}</span>
                            {{ discount.discount }}
                        </p>
                    </div>
                    <div class="py-4 font-bold divide-y-2 divide-black divide-dashed">
                        <div></div>
                        <div></div>
                    </div>
                    <div class="flex justify-between mt-1">
                        <p class="text-sm font-semibold text-gray-600">Total Amount</p>
                        <span v-if="totalAmt">
                            <p class="text-sm font-bold text-black md:text-base">{{ currency }} {{ totalAmt.toFixed(2) }}</p>
                        </span>
                    </div>
                    <div class="px-5 mt-10 border-2 border-gray-100 rounded py-7" v-show="!isLoggedIn">
                        <div class="flex justify-between">
                            <div>
                                <p class="font-bold">Have an account?</p>
                                <span class="text-sm font-light">
                                
                                    <router-link to="/register" class="text-sm font-light underline"> Join</router-link>
                                    or
                                    <router-link to="/login" class="underline"> login</router-link>
                                    for a smoother checkout
                                </span>
                            </div>
                            <span class="text-2xl font-bold"><UserIcon class="w-6 h-6 text-black" aria-hidden="true" /></span>
                        </div>
                    </div>
                    <div v-show="isLoggedIn">
                        <a :href="`checkout`"  class="flex justify-between w-full px-5 py-10 mt-10 rounded bg-primary">
                            <p class="self-center font-semibold text-primary">Continue to checkout</p>
                            <span class="self-center w-12 h-12 p-3 text-2xl font-light text-center text-black bg-white rounded-full">
                                <ArrowCircleRightIcon class="w-6 h-6 text-black" aria-hidden="true" />
                            </span>
                        </a>
                    </div>
                    <div class="mt-8 font-semibold text-black ">
                        <div class="pb-10 underline ">Use a discount code</div>
                            <input type="text" name="text" 
                                placeholder="Discount code" 
                                v-model="coupon" 
                                class="block w-full px-2 py-2 mt-1 text-sm border-b-2 border-black dark:border-gray-600 dark:bg-gray-700 focus:border-green-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
                            <div class="text-center">
                                <button @click="getCoupon" class="px-6 py-3 mt-5 font-semibold border-2 border-gray-300 rounded-full" type="submit">Get this Coupon</button>
                            </div>
                        </div>
                        <p class="mt-8 space-x-4 text-sm font-semibold text-gray-600">
                            <fa icon="shopping-basket" />
                            <span> Shopping with SSL data encryption</span>
                        </p>
                </div>
            </div>
            
           
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import { UserIcon, ArrowCircleRightIcon } from '@heroicons/vue/outline'
// import { notify } from "@kyvg/vue3-notification"

export default {
  name: 'cart',
  components: {
    UserIcon,
    ArrowCircleRightIcon
    // MenuTab
  },
  data () {
    return {
        isLoggedIn: false,
        products: null,
        product: null,
        currency: null,
        quantity: 1,
        coupon: null,
        discount: null,
        animationDown :{
            translateY:'translateY(-100%)',
            // eslint-disable-next-line no-dupe-keys
            translateY:'translateY(100%)'
        },
        AuthStr: 'Bearer ' + localStorage.getItem('authToken'),
        orders: null
    }
  },
  computed: {

    increment(product) {
         //  let item = this.$store.state.cart.find(p => p.id == product.id);
         // console.log(item.quantity)
        this.$store.commit('increment', product)
    },
     
    decrement(product) {
        this.$store.commit('decrement', product);
    },

    cartSubTotal() {
        let total = 0;
        // let totalAmt = 0;
        for (let product of this.$store.state.cart) {
            total += Number(product.totalPrice);
            if(product.selectedOption[0]){
                product.selectedOption.forEach((item, i) => {
                    total += Number(product.selectedOption[i].price);
                })
            }else if(this.discount){
                if(this.discount.percentage == 1){
                    total *= this.discount.discount/ 100;
                }else if(this.discount.percentage == 0) {
                    total -= this.discount.discount;
                }
            }
            
        }
        return total;
    },

    cartItemCount() {
      return this.$store.getters.count;
    },

    totalAmt(){
        //sum totalprices of products in the cart and divide or subtract discount from it
        //determine whether discount is % or a fixed amount to enable you to calculate the totalAmt
       let total = 0;
        total = Number(this.cartSubTotal);
        return total;
    }
},
  mounted () {
    if (localStorage.getItem("authToken")) {
      this.isLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem("user"))
    }

    if (localStorage.getItem("cart")) {
      this.products = JSON.parse(localStorage.getItem("cart"))
    //   this.product = JSON.parse(localStorage.getItem("cart"))
    }
    let base_url = this.$store.state.baseUrl;
    axios.get(base_url+'api/app/settings')
        .then(response => (this.settings = response.data))
        .catch(error => console.log(error))
        
    
  },

    created() {
        this.getCurrency();
        this.getCoupon();
    },

   methods: {

       getCoupon(){
           let base_url = this.$store.state.baseUrl;
           if(this.coupon){
           this.$store.commit('loading', true)
           axios.get(base_url+'api/coupons/' + this.coupon)
            .then((response) => {
                this.$store.commit('loading', false)
                this.discount = response.data
            })
            // for(let product of this.$store.state.cart) {
            //     console.log(product.id)
            //     if(product == this.discount.products){
                    return this.discount
            //     }
            // }
           }
       },

        getCurrency() {
            let base_url = this.$store.state.baseUrl;
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


        // increment(product) {
        //     if(product.available_qty > 1){
        //         this.quantity++;
        //         this.totalPrice = product.price + this.quantity;
        //     }
        // },

        // decrement() {
        //     if(this.quantity === 1)
        //     {
        //          notify({
        //             type: "error",
        //             title: "Cart",
        //             text: "You cannot add 0 product",
        //         });
        //     }else{
        //         this.quantity--
        //     }
        // },

    }
}
</script>
