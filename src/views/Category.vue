<template>
    <div class="container max-w-6xl px-5 mx-auto mt-32 mb-5">
       <p class="text-2xl text-gray-700 md:text-4xl">Category</p>
       <div v-if="products">
           <div  v-if="products.length <= 0">
               <p class="mt-5 text-center">No Product associated to this category</p>
           </div>
           <div v-else class="grid grid-cols-2 gap-4 mt-16 md:grid-cols-4">
                <div class="my-5"  v-for="product in products" :key="product.id">
                    <a :href="$router.resolve({name: 'Product', params: { id: product.id, slug: sanitizeTitle(`${product.name}`) }}).href">
                    <!-- <a :href="`product/${product.id}/`+sanitizeTitle(`${product.name}`)"> -->
                        <img  v-if="product" v-bind:src="product.photo" class="mx-auto rounded-lg h-14 md:h-44">
                        <p class="mt-2 font-semibold text-center text-gray-700">{{ truncate(product.name, 15) }}</p>
                        <span v-if="product.discount_price > 0">
                        <p class="text-xs text-center text-gray-700">{{ currency }} <span class="line-through">{{ product.price.toFixed(1) }}</span> <span class="text-xs text-base">{{ product.discount_price.toFixed(1) }}</span></p>
                        </span>
                        <span v-else>
                        <p class="text-xs text-center text-gray-700 ">{{ currency }}{{ product.price }}</p>
                        </span>
                    </a>
                </div>
            </div>
       </div>
       
        
    </div> 
</template>
<script>
import axios from 'axios'
export default {
    data () {
    return {
        products: [],
        currency: null
        
    }
  },
  mounted () {
     let base_url = this.$store.state.baseUrl;
      axios.get(base_url+'api/search?category_id='+ this.$route.params.id)
    .then((response) => {
        let search
        search = response.data.products.data
        this.products = search

        // console.log(this.products)
    })

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

    // slugify(string) {
    //   return string
    //   .toString()
    //   .trim()
    //   .toLowerCase()
    //   .replace(/\s+/g, "-")
    //   // eslint-disable-next-line no-useless-escape
    //   .replace(/[^\w\-]+/g, "")
    //   // eslint-disable-next-line no-useless-escape
    //   .replace(/\-\-+/g, "-")
    //   .replace(/^-+/, "")
    //   .replace(/-+$/, "");
    // }
  }
}
</script>