<template>
    <div class="mt-10 sm:mt-0" v-show="isLoggedIn">
        <div class="max-w-xl mx-auto overflow-hidden rounded-sm shadow-md bg-gray-50">
            <div class="px-4 py-5 bg-white sm:p-6">
                <p class="mb-5 text-xl font-bold ">Payment</p>
                <div class="flex flex-col">
                    <div class="flex justify-between">
                        <p>Distance</p>
                        <p>0</p>
                    </div>
                    <div class="flex justify-between">
                        <p>Delivery Charges</p>
                        <p>20.74km</p>
                    </div>
                    <div class="flex justify-between">
                        <p>Package Size Charges</p>
                        <p>20.74km</p>
                    </div>
                    <div class="py-4 font-bold divide-y-2 divide-black divide-dashed">
                        <div></div>
                        <div></div>
                    </div>
                    <div class="flex justify-between">
                        <p>Subtotal</p>
                        <p>20.74km</p>
                    </div>
                    <div class="flex justify-between">
                        <p>Tax</p>
                        <p>{{ currency }}</p>
                    </div>
                    <div class="py-4 font-bold divide-y-2 divide-black divide-dashed">
                        <div></div>
                        <div></div>
                    </div>
                    <div class="flex justify-between">
                        <p>Total</p>
                        <p>20.74km</p>
                    </div>
                </div>
                <div class="mt-5">
                    <p class="mb-2 text-xl font-bold ">Payment Methods</p>
                    <p class="text-sm font-light ">Please select your mode of payment</p>
                    <div class="grid mt-5 space-x-2 md:grid-cols-2">
                        <div  class="w-48 h-12 p-2 mt-5 bg-white border shadow-md hover:border-green-500 rounded-xl" v-for="(method, index) in methods" :key="index">
                            <div class="flex items-center self-center justify-center">
                                <div class="flex-shrink-0">
                                    <img class="self-center object-cover w-8 h-8 md:h-8 md:w-8"  v-if="method" v-bind:src="method.photo" alt="payment">
                                </div>
                                <div class="px-2">
                                    <div class="text-xs font-semibold text-center text-black md:text-xs">{{ method.name }}</div>
                                </div>
                                <label class=" md:items-start md:justify-start md:flex">
                                    <div class="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500">
                                        <input type="checkbox" class="absolute opacity-0" v-model="paymentMethod" :value="method">
                                        <svg class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                    </div>
                                    <!-- <div class="text-sm font-medium text-black md:text-base">{{ paymentMethod.name }}</div> -->
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <Navigation></Navigation>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Navigation from './Navigation.vue'
export default {
    components: {
        Navigation
    },
    data () {
        return {
            AuthStr : 'Bearer ' + localStorage.getItem('authToken'),
            paymentMethod: [],
            isLoggedIn: false,
            user: null,
            methods: null,
            packages: null,
            package: null,
            couriers_: null,
            courier_: null,
            currency: null,
            address: null,
            from: null,
            to: null
        }
    },
    
    mounted() {
        let base_url = this.$store.state.baseUrl
        this.getCourier()
        this.getAddress()

        if (localStorage.getItem("authToken")) {
            this.isLoggedIn = true;
            this.user = JSON.parse(localStorage.getItem("user"))
        }


        if(this.isLoggedIn == false) {
            localStorage.removeItem("user")
            localStorage.removeItem("authToken")
            this.$router.push("/login")
        }
        
        // payment method
        axios.get(base_url+'api/payment/methods', { 
        'headers': { 'Authorization': this.AuthStr } })
        .then(response => (this.methods = response.data.data))
        .catch(error => console.log(error))
        
        // order summary method
        let weight = localStorage.getItem('weight')
        axios.get(base_url+'package/order/summary',{ params: 
            { 
                vendor_id: this.getCourier.id, 
                package_type_id: this.getCourier.package_type_id,
                weight: weight,
                stops: this.address.id
            }, headers: { 'Authorization': this.AuthStr }
        })
        .then((response) => {
           console.log("data", response)
        })
        .catch(error => console.log(error))
    },

    created() {
        this.getCurrency()
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

        getPackage()
        {
            let base_url = this.$store.state.baseUrl
            this.$store.commit('loading', true)
            axios.get(base_url+'api/package/types')
            .then((response)=> {
                this.$store.commit('loading', false)
                this.packages = response.data;
                let package_id = localStorage.getItem('packageType')
                this.package = this.packages.find(p => p.id == package_id)
            })
            return this.package
            .catch(error => console.log(error))
        },

        getCourier()
        {
            let base_url = this.$store.state.baseUrl
            let package_id = localStorage.getItem('packageType')
            axios.get(base_url+'api/vendors?type=package&package_type_id='+package_id)
            .then((response) => {
                this.couriers_ = response.data.data
                let courier_id = localStorage.getItem('courier')
                this.courier_ = this.couriers_.find(c => c.id == courier_id)
                // console.log(this.courier_.package_types_pricing)
                // console.log(this.courier_.package_types_pricing.package_type_id)
                // console.log(this.courier_)
                
            })
            .catch(error => console.log(error))

        },

        getAddress()
        {
            // delivery address method
            let base_url = this.$store.state.baseUrl
            axios.get(base_url+'api/delivery/addresses', { 
                'headers': { 'Authorization': this.AuthStr } })
            .then((response) => {
                this.from = response.data.data
                let from_id = localStorage.getItem('from')
                this.address = this.from.find(f => f.id == from_id)
                // console.log(this.address)
            })
            .catch(error => console.log(error))
        },
        
        getFromAddress()
        {
            let base_url = this.$store.state.baseUrl
            axios.get(base_url+'api/delivery/addresses', { 
                'headers': { 'Authorization': this.AuthStr } })
            .then((response) => {
                this.to = response.data.data
                let to_id = localStorage.getItem('to')
                this.address = this.to.find(f => f.id == to_id)
                // console.log(this.address)
            })
            .catch(error => console.log(error))
        }
        
    }
}
</script>