<template>
    <div class="container max-w-6xl p-5 mx-auto mt-5 md:mt-20">
        <p class="py-5 text-xl font-light md:text-4xl">Recommended for you</p>
        <div class="px-2">
          <vue-horizontal ref="horizontal" class="horizontal" responsive>
            <section v-for="product in products" :key="product.id" class="grid grid-cols-1 gap-4 px-5">
                <a :href="$router.resolve({name: 'Product', params: { id: product.id, slug: sanitizeTitle(`${product.name}`) }}).href">
                    <img  v-if="product" v-bind:src="product.photo" class="rounded-lg h-14 md:h-44">
                    <p class="mt-5 font-medium text-gray-600">{{  truncate(product.name, 15) }}</p>
                    <span v-if="product.discount_price > 0">
                      <p class="mt-2 text-xs text-gray-700">{{ currency }} <span class="line-through">{{ product.price.toFixed(1) }}</span> <span class="text-base">{{ product.discount_price.toFixed(1) }}</span></p>
                    </span>
                    <span v-else>
                      <p class="mt-2 text-xs text-gray-700">{{ currency }}{{ product.price.toFixed(2) }}</p>
                    </span>
                </a>
            </section>
        </vue-horizontal>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios'
import VueHorizontal from "vue-horizontal";
export default {
    components: {
    VueHorizontal,
    
  },
  data () {
    return {
        products: null,
        currency: null
        
    }
  },
  mounted () {
    let base_url = this.$store.state.baseUrl;
      axios.get(base_url+'api/products/')
    .then(response => (this.products = response.data.data))
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