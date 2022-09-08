<template>
    <div id="tabs" class="mx-auto md:mt-10" v-if="vendor">
        
        <div v-if="vendor.menus" >
            <div class="tabs" v-for="menu in vendor.menus" :key="menu.id">
                <p class="mt-10 mb-5 text-4xl font-light">{{ menu.name }}</p>
                <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div class="my-5" v-for="product in menu.products" :key="product.id">
                        <router-link :to="{ name: 'Product', params: { id: product.id, slug: sanitizeTitle(product.name) }}" class="transition duration-500 ease-in-out">
                            <img  v-if="product.photo" v-bind:src="product.photo" class="w-auto mb-3 rounded md:mx-auto h-28 md:w-full md:h-56">
                            <div class="flex flex-col md:text-center">
                                <p class="mb-1 font-semibold md:mt-4 text-l">{{ truncate(product.name, 20) }}</p>
                                <p class="text-gray-700 md:mb-4 ">{{ currency }}{{ product.price }}</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No Menu yet</p>
        </div>
  
    </div>
    
</template>
<script>
import axios from 'axios'
export default {
    el: '#tabs',
    data: function() {
        return { 
            vendor: null,
            currency: null,
        };
    },
    mounted () {
        let base_url = this.$store.state.baseUrl;
         this.$store.commit('loading', true)
        axios.get(base_url+'api/vendors/' + this.$route.params.id)
        .then((response) => {
             this.$store.commit('loading', false)
            this.vendor = response.data
        })
        .catch(error => console.log(error))
    },

    created() {
        this.getCurrency();
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

        truncate(str, n){
            return (str.length > n) ? str.substr(0, n-1) + '...' : str;
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
    }
}
</script>
