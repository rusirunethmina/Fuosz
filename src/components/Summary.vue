<template>
    <div class="mt-10 sm:mt-0" v-show="isLoggedIn">
        <div class="max-w-xl mx-auto overflow-hidden shadow sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
                <p class="mb-5 text-xl font-bold ">Recipient Info</p>
                <div class="flex flex-col">
                    <p class="mb-5 text-xl font-medium ">Package Type</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex flex-row space-x-2" v-if="sumPackage">
                            <img v-bind:src="sumPackage.photo" class="w-8 h-8">
                            <div>
                                <p class="font-medium">{{ sumPackage.name }}</p>
                                <p class="text-sm font-light">{{ sumPackage.description }}</p>
                            </div>
                        </div>
                    </div>
                    <p class="mb-5 text-xl font-medium ">Courier Vendor</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex flex-row space-x-2" v-if="sumCourier">
                            <img v-bind:src="sumCourier.logo" class="w-8 h-8">
                            <div>
                                <p class="font-medium">{{ sumCourier.name }}</p>
                                <p class="text-sm font-light">{{ sumCourier.description }}</p>
                            </div>
                        </div>
                    </div>
                    <p class="mb-5 text-xl font-medium ">Delivery Details</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <p class="font-medium">From</p>
                        <p class="font-normal" v-if="sumFrom">{{ sumFrom.name }}</p>

                        <p class="font-medium">Stop 1</p>
                        <p class="font-normal" v-if="sumTo">{{ sumTo.name }}</p>
                        <div class="flex justify-between">
                            <div>
                                <p class="font-medium ">DATE</p>
                                <p class="font-normal">ASAP</p>
                            </div>
                            <div>
                                <p class="font-medium ">TIME</p>
                                <p class="font-normal">ASAP</p>
                            </div>
                        </div>
                    </div>
                    <p class="mb-5 text-xl font-medium ">Recipient Info</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex justify-between">
                            <div>
                                <p class="font-medium">Name</p>
                                <p class="font-normal" v-if="fullname">{{ fullname }}</p>
                            </div>
                            <div>
                                <p class="font-medium">Phone</p>
                                <p class="font-normal" v-if="phone">{{ phone }}</p>
                            </div>
                        </div>
                        <p class="font-medium">Note</p>
                        <p class="font-normal" v-if="note">{{ note }}</p>
                    </div>
                    <p class="mb-5 text-xl font-medium ">Package Parameters</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex justify-between">
                            <div>
                                <p class="font-medium ">Weight</p>
                                <p class="font-normal" v-if="weight">{{ weight }}</p>
                            </div>
                            <div>
                                <p class="font-medium">Length</p>
                                <p class="font-normal" v-if="length">{{ length }}</p>
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <div>
                                <p class="font-medium ">Width</p>
                                <p class="font-normal" v-if="width">{{ width }}</p>
                            </div>
                            <div>
                                <p class="font-medium">Height</p>
                                <p class="font-normal" v-if="height">{{ height }}</p>
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
import Navigation from './Navigation.vue'
import axios from 'axios'
export default {
    components: {
        Navigation
    },
    data() {
        return {
           
            isLoggedIn: false,
            user: null,
            fullname: null,
            sumPackage: null,
            sumPackages: null,
            sumCourier: null,
            sumCouriers: null,
            AuthStr: 'Bearer ' + localStorage.getItem('authToken'),
            from: null,
            sumFrom: null,
            to: null,
            sumTo: null,
            fullname: null,
            phone: null,
            note: null,
            weight: null,
            width: null,
            height: null,
            length: null
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

        let base_url = this.$store.state.baseUrl

        if(localStorage.getItem('packageType')){
            this.$store.commit('loading', true)
            axios.get(base_url+'api/package/types')
            .then((response)=> {
                this.$store.commit('loading', false)
                this.sumPackages = response.data;
                let package_id = localStorage.getItem('packageType')
                this.sumPackage = this.sumPackages.find(p => p.id == package_id)
            })
            .catch(error => console.log(error))

        }

        let package_id = localStorage.getItem('packageType')
        axios.get(base_url+'vendors?type=package&package_type_id='+package_id)
        .then((response)=> {
            this.sumCouriers = response.data.data
            let courier_id = localStorage.getItem('courier')
            this.sumCourier = this.sumCouriers.find(c => c.id == courier_id)
        })
        .catch(error => console.log(error))

        axios.get(base_url+'delivery/addresses', { 
            'headers': { 'Authorization': this.AuthStr } })
        .then((response) => {
            this.from = response.data.data
            let from_id = localStorage.getItem('from')
            let to_id = localStorage.getItem('to')
            this.sumFrom = this.from.find(f => f.id == from_id)
            this.sumTo = this.from.find(t => t.id == to_id)
        })
        .catch(error => console.log(error))

        this.fullname = localStorage.getItem('fullname')
        this.phone = localStorage.getItem('phone')
        this.note = localStorage.getItem('note')
        this.height = localStorage.getItem('height')
        this.width = localStorage.getItem('width')
        this.length = localStorage.getItem('plength')
        this.weight = localStorage.getItem('weight')

    },  
}
</script>