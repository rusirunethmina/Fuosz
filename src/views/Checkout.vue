<template>
  <div class="checkout" v-show="isLoggedIn">
    <section class="container max-w-6xl px-5 mx-auto mt-32 mb-5" v-if="user">
            <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div class="md:col-start-1 md:col-span-full md:col-span-4">
                    <p class="mb-16 text-4xl font-bold leading-none tracking-widest xl:text-5xl">How would you like to receive your order?</p>
                    <div class="flex flex-col justify-start mb-5 md:max-w-sm tems-start">
                        <input type="text" name="tip" id="tip" placeholder="tip driver" v-model="tip" class="block w-full px-2 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <textarea id="note" name="note" placeholder="note" v-model="note" rows="3" class="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <span v-if="products[0].vendor.pickup == 1">
                    <label class="md:items-start md:justify-start md:flex">
                        <div class="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500">
                            <input type="checkbox" class="absolute opacity-0" v-model="vendor_pickup" @click="vendorPickup">
                            <svg class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                        </div>
                        <div class="text-base font-semibold">Pickup Order</div>
                    </label>
                     <p class="text-xs font-light text-gray-600 md:text-sm">Please indicate whether you will pickup order from the vendor</p>
                    </span>
                     <div class="mt-10"  v-show="vendor_pickup == false || vendor_pickup == null">
                         <p class="text-base font-semibold">Delivery Address</p>
                         <div class="flex space-x-5">
                             <span class="mt-2 text-xs font-light text-gray-600 md:text-sm">Please select delivery address/location</span>
                             <a href="/profile" class="px-8 py-2 text-xs text-green-500 md:text-sm hover:underline">Add address</a>
                         </div>
                         <div class="mt-2 md:max-w-sm" v-if="user">
                            <select id="address" name="address" @change="GetDeliveryFee" v-model="address" class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <!-- <option value="0">Select a delivery address</option> -->
                                <option v-for="address in addresses" :value="address" v-bind:key="address.id">
                                    {{ address.name }} [{{ address.address }}]
                                </option>
                            </select>
                         </div>
                     </div>
                    <!-- </div> -->
                     <div class="mt-10">
                         <p class="text-base" v-if="user">Payment Methods</p>
                         <div class="grid grid-cols-1 space-x-2 md:grid-cols-2">
                            <div  class="py-5 mt-5 bg-white border shadow-md md:py-3 md:h-18 hover:border-green-500 md:w-80 rounded-xl" v-for="(method, index) in methods" :key="index">
                                <div class="flex justify-center">
                                    <div class="flex-shrink-0">
                                        <img class="self-center object-cover w-8 h-8 md:h-14 md:w-14"  v-if="method" v-bind:src="method.photo" alt="Man looking at item at a store">
                                    </div>
                                    <div class="self-center px-2 pt-2 md:p-4">
                                        <div class="self-center text-xs font-semibold text-black md:text-xl">{{ method.name }}</div>
                                    </div>
                                    <label class="self-center md:items-start md:justify-start md:flex">
                                        <div class="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500">
                                            <input type="radio" class="absolute opacity-0" v-model="paymentMethod" :value="method">
                                            <svg class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                        </div>
                                        <!-- <div class="text-sm font-medium text-black md:text-base">{{ paymentMethod.name }}</div> -->
                                    </label>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>

                <div class="md:col-start-5 md:col-end-7">
                    <div class="flex justify-between">
                        <p class="py-3 text-sm font-semibold text-gray-600">Your order</p>
                        <router-link to="/cart" class="font-light text-gray-600 underline">Edit</router-link>
                    </div>
                    <div class="flex justify-between my-10" v-for="product in products" :key="product.id">
                        <div class="flex space-x-2">
                            <img  v-if="product.photo" v-bind:src="product.photo" class="rounded w-14 h-14">
                            <div>
                            <p class="text-xs text-gray-600">{{ product.name }}</p>
                            <p class="text-xs text-gray-600">Quantity: {{ product.quantity }}</p>
                            <p class="text-xs text-gray-600">Total: {{ currency }} {{ product.totalPrice.toFixed(2) }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <div v-for="option in product.selectedOption" :key="option.id" class="mb-3">
                                <img v-bind:src="option.photo" class="rounded w-14 h-14">
                                <div>
                                    <p class="text-xs text-gray-600">{{ option.name }}</p>
                                    <!-- <p class="text-xs text-gray-600">Quantity: {{ product.quantity }}</p> -->
                                    <p class="text-xs text-gray-600">Total: {{ currency }}{{ option.price.toFixed(2) }}</p>
                                </div>
                            </div>
                            
                        </div>
                        <!-- <p class="text-xs text-gray-600">{{ currency }}{{ product.price.toFixed(2) }}</p> -->
                        
                    </div>
                    <div class="flex my-5">
                        <p class="py-3 text-sm font-semibold text-gray-600">Order summary</p>
                    </div>
                    <div class="flex my-5 ">
                        <!-- <p class="text-xs font-light text-gray-600">Total delivery cost</p> -->
                        <p class="text-xs font-light text-gray-600">This subtotal does include the delivery or pickup cost</p>
                    </div>
                    <div class="font-bold divide-y divide-black">
                        <div></div>
                        <div></div>
                    </div>
                    <div class="flex justify-between mt-4">
                        <p class="text-sm font-light text-gray-600">Subtotal</p>
                        <p class="text-sm font-bold text-black md:text-base">{{ currency }} {{ cartSubTotal ? cartSubTotal.toFixed(2) : '' }}</p>
                    </div>
                    <div class="flex justify-between mt-1">
                        <!-- <p class="text-sm font-light text-black md:text-base">Discount</p> -->
                        <!-- <p class="text-sm font-bold text-black md:text-base">{{ currency }}{{ product ? product.discount_price : 0 }}</p> -->
                    </div>
                    <div class="flex justify-between mt-1">
                        <p class="text-sm font-light text-gray-600">Delivery Fee</p>
                        <p class="text-sm font-bold text-black md:text-base">{{ currency }}{{ delivery_amount ? delivery_amount.toFixed(2) : '0.00' }}</p>
                    </div>
                    <div class="flex justify-between mt-1" >
                        <p class="text-sm font-light text-gray-600">Tax({{ tax }})</p>
                        <p class="text-sm font-bold text-black md:text-base">{{ currency }}{{ getTaxAmt ? getTaxAmt.toFixed(2) : '0.00' }}</p>
                    </div>
                    <div class="py-4 font-bold divide-y-2 divide-black divide-dashed">
                        <div></div>
                        <div></div>
                    </div>
                    <div class="flex justify-between mt-1">
                        <p class="text-sm font-semibold text-gray-600">Total Amount</p>
                        <p class="text-sm font-bold text-black md:text-base">{{ currency }}{{ cartTotalAmt ? cartTotalAmt : '0.00' }}</p>
                    </div>

                    <p class="mt-8 space-x-4 text-sm font-semibold text-gray-600">
                        <fa icon="shopping-basket" />
                        <span> Shopping with SSL data encryption</span>
                    </p>
                    <div class="grid mt-16 grid-col-1">
                        <div @click="checkoutOrder" class="flex justify-center px-6 py-3 space-x-3 text-white rounded cursor-pointer bg-primary hover:bg-green-700">
                            <CreditCardIcon class="w-6 h-6 text-white" aria-hidden="true" />
                            <span> Place Order</span>
                        </div>
                    </div>
                </div>
            </div>
    </section>
    <!-- footer -->
    <!-- <Footer/> -->
  </div>
</template>

<script>
import axios from 'axios'
import { CreditCardIcon } from '@heroicons/vue/outline'
import { notify } from "@kyvg/vue3-notification"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
export default {
  name: 'checkout',
  components: {
    CreditCardIcon
  },
  data () {
    return {
        isLoggedIn: false,
        user: null,
        tip: null,
        note: null,
        products: null,
        addresses: null,
        currency: null,
        methods: null,
        tax: 0,
        taxAmt: 0,
        discount: 0,
        delivery_amount: 0,
        vendor_pickup: null,
        delivery_fee: 0,
        animationDown :{
            translateY:'translateY(-100%)',
            // eslint-disable-next-line no-dupe-keys
            translateY:'translateY(100%)'
        },
        AuthStr : 'Bearer ' + localStorage.getItem('authToken'),
        paymentMethod: null,
        address: null,

    }
  },

    computed: {
        cartSubTotal() {
            let total = 0;
            for (let product of this.$store.state.cart) {
                total += Number(product.totalPrice)
                if(product.selectedOption[0]){
                    product.selectedOption.forEach((item, i) => {
                        total += Number(product.selectedOption[i].price);
                    })
                }
            }
            
            return total;
        },

        cartTotalAmt() {
            let total = 0;
            let totalAmt 
            totalAmt = Number(this.cartSubTotal);
            // for (let product of this.$store.state.cart[0]) {
                // if(this.delivery_fee) {
                    // total += Number(product.totalPrice)
                    if(this.vendor_pickup) {
                         
                        totalAmt += Number(this.getTaxAmt)
                        
                    }else if(this.GetDeliveryFee) { 
                        
                        totalAmt += Number(this.getTaxAmt) + Number(this.delivery_fee)
                    }else
                    {
                        totalAmt += Number(this.getTaxAmt)
                    }
                    
                // }
               
               
            // }
            return totalAmt.toFixed(2);
        },

        getTaxAmt() {
            let taxAmt;
            let tax;
            let product = this.$store.state.cart[0]
                
            tax = product.vendor.tax;
            taxAmt = Number(tax)/ 100 * this.cartSubTotal
               console.log(taxAmt)
            return taxAmt;
        },
 
    },
    mounted () {
        let base_url = this.$store.state.baseUrl

        if (localStorage.getItem("cart")) {
            this.products = JSON.parse(localStorage.getItem("cart"))
        }

        axios.get(base_url+'api/payment/methods', { 
            'headers': { 'Authorization': this.AuthStr } })
        .then(response => (this.methods = response.data.data))
        .catch(error => console.log(error))

        axios.get(base_url+'api/delivery/addresses', 
        { 'headers': { 'Authorization': this.AuthStr } }
            )
        .then(response => (this.addresses = response.data.data))
        .catch(error => console.log(error))
        

        if (localStorage.getItem("authToken")) {
            this.isLoggedIn = true;
            this.user = JSON.parse(localStorage.getItem("user"))
        }

        if(this.isLoggedIn == false) {
            this.$router.push("/login");
            localStorage.removeItem("user")
            localStorage.removeItem("authToken")
        }
    },
    created() {
        this.getCurrency()
        this.getTax()
    },
    methods: {

        vendorPickup()
        {
            this.delivery_fee = 0.00
        },

        


        calcCrow() 
        {
            let cart = this.$store.state.cart[0]
            let vendor = cart.vendor
            let lat1 = this.toRad(vendor.latitude)
            let lon1 = this.toRad(vendor.longitude)
            let lat2
            let lon2
            if(this.address != null){
                 lat2 = this.toRad(this.address.latitude)
                 lon2 = this.toRad(this.address.longitude)
            }
            
            var R = 6371; // km
            var dLat = this.toRad(lat2-lat1);
            var dLon = this.toRad(lon2-lon1);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c;
            // console.log(d.toFixed(2))
            return d.toFixed(2);
        },


        toRad(Value) 
        {
            return Value * Math.PI / 180;
        },

        GetDeliveryFee()
        {
            let cart = this.$store.state.cart[0]
            let vendor = cart.vendor
            let address_id
            if(this.address != null){
                 address_id = this.address.id
            }
            let base_url = this.$store.state.baseUrl

            this.$store.commit('loading', true)
            axios.get(base_url+'api/general/order/summary',{
                params: {
                    delivery_address_id: address_id,
                    vendor_id: vendor.id
                },
                'headers': { 'Authorization': this.AuthStr }
            })
            .then( (response) => {
                this.$store.commit('loading', false)
                let fee = response.data
                this.delivery_fee = fee.delivery_fee
            
                if(vendor.delivery_range < this.calcCrow()) {
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Delivery address out of reach for vendor!',
                    })
                }else {
                    this.delivery_amount = this.delivery_fee
                }
            })
        },

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

        getTax() {
            for (let product of this.$store.state.cart) {
                this.tax = product.vendor.tax;
            }
            return this.tax;
        },

        checkoutOrder() {
            let base_url = this.$store.state.baseUrl
            if(this.vendor_pickup == null && this.address == null)
            {
                notify({
                    type: "error",
                    title: "Order Checkout",
                    text: 'address field is empty',
                })
            }else if(this.paymentMethod == null)
            {
                notify({
                    type: "error",
                    title: "Order Checkout",
                    text:  'select a payment method',
                })
            }else {
                for (let product of this.$store.state.cart) {
                    if(product.selectedOption.length != 0) {
                        
                        for(let option of product.selectedOption) {
                            let vendor_id = product.vendor.id;
                            let sub_total = this.cartSubTotal;
                            let tax = product.vendor.tax;
                            let address_id = this.address ? this.address.id : '';
                            let payment = this.paymentMethod;
                            let quantity = product.quantity;
                            let price = product.price;
                            let total = this.cartTotalAmt;
                            let product_ =
                                [
                                    {
                                        "selected_qty":quantity,
                                        "price":price,
                                         "product":{
                                            "id": product.id,
                                            "name": product.name
                                        },
                                        "options": [
                                        {
                                            "id": option.id ? option.id : '',
                                            "name": option.name ? option.name : '',
                                        },

                                        ],
                                        "options_ids":[option.id ? option.id : ''],
                                        "options_flatten":option.name ? option.name : '',
                                    }
                                ]
                                // console.log(product_)

                            axios.post(base_url+'api/orders', 
                            { 
                                vendor_id: vendor_id,
                                sub_total: sub_total,
                                tax: tax,
                                // quantity: quantity,
                                // price: price,
                                // options: options,
                                discount: this.discount,
                                delivery_address_id: address_id,
                                payment_method_id: payment.id,
                                delivery_fee: this.delivery_fee,
                                total: total,
                                note: this.note,
                                tip: this.tip,
                                products: product_
                            }, { 
                                'headers': { 'Authorization': this.AuthStr } })
                            .then(function (response) {
                                localStorage.removeItem('cart');
                                if (payment.is_cash == 1) {
                                    Swal.fire({
                                        title: 'Order Successful',
                                        text: "Please pay rider" + " "+ total +" " +" on delivery",
                                        icon: 'success',
                                        showCancelButton: false,
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: 'Okay'
                                    }).then((result) => {
                                        if(result.isConfirmed) {
                                            window.location.href = '/'
                                        }
                                    })

                                }else {
                                    notify({
                                        type: "success",
                                        title: "Order Checkout",
                                        text: response.data.message,
                                    });
                                    window.location.href = response.data.link
                                }

                            })
                            .catch(error => console.log(error))
                        }
                    }else {
                        let vendor_id = product.vendor.id;
                            let sub_total = this.cartSubTotal;
                            let tax = product.vendor.tax;
                            let address_id = this.address ? this.address.id : '';
                            let payment = this.paymentMethod;
                            let quantity = product.quantity;
                            let price = product.price;
                            let total = this.cartTotalAmt;
                            let product_ =
                                [
                                    {
                                        "selected_qty":quantity,
                                        "price":price,
                                         "product":{
                                            "id": product.id,
                                            "name": product.name
                                        },
                                        "options": [
                                        {
                                            "id": '',
                                            "name": '',
                                        },

                                        ],
                                        "options_ids":[''],
                                        "options_flatten": '',
                                    }
                                ]
                                console.log(product_)

                            axios.post(base_url+'api/orders', 
                            { 
                                vendor_id: vendor_id,
                                sub_total: sub_total,
                                tax: tax,
                                // quantity: quantity,
                                // price: price,
                                // options: options,
                                discount: this.discount,
                                delivery_address_id: address_id,
                                payment_method_id: payment.id,
                                delivery_fee: this.delivery_fee,
                                total: total,
                                note: this.note,
                                tip: this.tip,
                                products: product_
                            }, { 
                                'headers': { 'Authorization': this.AuthStr } })
                            .then(function (response) {
                                localStorage.removeItem('cart');
                                if (payment.is_cash == 1) {
                                    Swal.fire({
                                        title: 'Order Successful',
                                        text: "Please pay rider" + " "+ total +" " +" on delivery",
                                        icon: 'success',
                                        showCancelButton: false,
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: 'Okay'
                                    }).then((result) => {
                                        if(result.isConfirmed) {
                                            window.location.href = '/'
                                        }
                                    })

                                }else {
                                    notify({
                                        type: "success",
                                        title: "Order Checkout",
                                        text: response.data.message,
                                    });
                                    window.location.href = response.data.link
                                }

                            })
                            .catch(error => console.log(error))
                    }
               }
            }
        },
        
    }
}
</script>
<style>
input:checked + svg {
    display: block;
}
</style>