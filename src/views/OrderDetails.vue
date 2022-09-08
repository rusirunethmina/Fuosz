<template>
    <div class="container max-w-6xl px-5 mx-auto mb-5 md:mt-32">
        <p class="text-2xl text-center text-gray-700 md:text-4xl">Order Details</p>
        <div class="grid grid-cols-1 gap-2 mt-8 md:grid-cols-6" v-if="order">
            <div class="md:col-start-1 md:col-span-full md:col-span-4">
                <div class="flex flex-col">
                    <img v-if="order" v-bind:src="order.vendor.feature_image" class="m-0 mb-5 md:w-28 md:h-20" alt="">
                    <div class="mb-1 md:space-x-2 md:flex">
                        <p class="font-semibold ">Vendor Name:</p>
                        <p class="font-light">{{ order.vendor.name }}</p>
                    </div>
                    <div class="mb-1 md:space-x-2 md:flex">
                        <p class="font-semibold ">Code</p>
                        <p class="font-light">{{ order.code }}</p>
                    </div>
                    <div class="mb-1 md:flex md:space-x-2">
                        <p class="font-semibold ">Verification code:</p>
                        <p class="font-light">{{ order.verification_code }}</p>
                    </div>
                    <div class="md:flex md:space-x-2">
                        <p class="font-semibold ">Delivery Address:</p>
                        <p class="font-light">{{ order.delivery_address ? order.delivery_address.address : 'Customer Order Pickup' }}</p>
                    </div>
                    <div class="md:flex md:space-x-2">
                        <p class="font-semibold ">Status:</p>
                        <p class="font-light text-gray-500 md:text-center " v-if="order.status == 'cancelled'">{{ order.status }}</p>
                        <p class="font-light text-green-500 md:text-center" v-else-if="order.status == 'delivered'">{{ order.status }}</p>
                        <p class="font-light text-blue-500 md:text-center" v-else>{{ order.status }}</p>
                    </div>
                </div>
            </div>
            <div class="md:col-start-5 md:col-end-7">
                <div class="flex justify-between" v-for="product in order.products" :key="product.id">
                    <div class="flex space-x-2">
                        <img  v-if="product.photo" v-bind:src="product.product.photo" class="rounded w-14 h-14">
                        <div>
                        <p class="text-xs text-gray-600">{{ product.product.name }}</p>
                        <p class="text-xs text-gray-600">Quantity: {{ product.quantity }}</p>
                        <p class="text-xs text-gray-600">Total: {{ currency }} {{ order.total }}</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-col">
                        <div v-for="option_group in product.product.option_groups" :key="option_group.id" class="mb-3">
                           
                            <div v-if="option_group.length <= 0">
                                <p class="text-xs text-black"> hi </p>
                            </div>
                            <div v-else>
                                <div v-for="option in option_group.options" :key="option.id">
                                    <img v-bind:src="option.photo" class="rounded w-14 h-14">
                                    <div>
                                        <p class="text-xs text-gray-600">{{ option.name }}</p>
                                        <p class="text-xs text-gray-600">Total: {{ currency }}{{ option.price }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex py-3 my-5 border-b border-black">
                    <p class="py-3 text-sm font-semibold text-gray-600">Order summary</p>
                </div>
                        <div class="flex justify-between mt-4">
                            <p class="text-sm font-light text-gray-600">Subtotal</p>
                            <p class="text-sm font-bold text-black md:text-base">{{ currency }} {{ order.sub_total.toFixed(2) }}</p>
                        </div>
                        <div class="flex justify-between mt-1">
                            <p class="text-sm font-light text-gray-600">Discount</p>
                            <p class="text-sm font-bold text-black md:text-base">{{ currency }} {{ order.discount.toFixed(2) }}</p>
                        </div>
                        <div class="flex justify-between mt-1">
                            <p class="text-sm font-light text-gray-600">Delivery Fee</p>
                            <p class="text-sm font-bold text-black md:text-base">{{ currency }} {{ order.delivery_fee.toFixed(2) }}</p>
                        </div>
                        <div class="flex justify-between mt-1" >
                            <p class="text-sm font-light text-gray-600">Tax({{ order.tax }})</p>
                            <p class="text-sm font-bold text-black md:text-base">{{ currency }} {{ order.tax.toFixed(2) }}</p>
                        </div>
                        <div class="py-4 font-bold divide-y-2 divide-black divide-dashed">
                            <div></div>
                            <div></div>
                        </div>
                        <div class="flex justify-between mt-1">
                            <p class="text-sm font-semibold text-gray-600">Total Amount</p>
                            <p class="text-sm font-bold text-black md:text-base">{{ currency }} {{ order.total }}</p>
                        </div>

                    
                    <!-- </div> -->
                    
                <!-- </div> -->
            </div>
        </div>
    </div>
    
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'orders',
        data() {
            return {
                order: null,
                AuthStr: 'Bearer ' + localStorage.getItem('authToken'),
                currency: null
            }
        },
        mounted() {
            this.getCurrency()
            let base_url = this.$store.state.baseUrl
    
            axios.get(base_url+'api/orders/' + this.$route.params.id, { 
            'headers': { 'Authorization': this.AuthStr } })
            .then((response) => {
                this.order = response.data
                // console.log(this.order)
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
    
        }
    }
</script>