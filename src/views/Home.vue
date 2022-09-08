<template>
<div class="">
  <div class=" bg-primary h-banner">
    <div class="container px-5 mx-auto md:flex md:flex-row md:max-w-6xl ">
      <div class="self-center p-10">
        <h2 class="text-3xl font-extrabold leading-tight text-white md:text-4xl md:tracking-wide md:leading-normal">
          {{ settings ? settings.strings.website.websiteHeaderTitle : ""}}
          <!-- Book your favourite restaurant with lovely menu -->
        </h2>
        <p class="mt-3 text-xl font-normal tracking-widest text-gray-200 md:text-2xl">
          {{ settings ? settings.strings.website.websiteHeaderSubtitle : ""}}
          <!-- Crispy Tofu Salad Greens & Honey Chilli -->
        </p>
        <div class="items-stretch w-full mt-12 md:flex">
          <!-- <input class="block w-full px-4 py-3 mr-2 text-black rounded-md md:py-5 md:w-2/2 focus:border-gray-500" type="text" name="search" placeholder="search product..."> -->
          <button v-on:click="toggleModal()" class="block w-full px-5 py-4 mt-2 font-semibold text-green-500 bg-white rounded-md shadow hover:text-white md:mt-0 hover:bg-green-600" type="button">
            Search product
          </button>
        </div>
        <!-- <div class="w-full px-4 py-3 mt-1 bg-white rounded-sm shadow-sm md:w-2/2">
            <div class="flex flex-col" v-if="products">
          
              <div  v-if="products.length <= 0">
                  <p class="mt-5 text-center">No Product</p>
              </div> 
              <div v-else>
                <div v-for="product in products" :key="product.id">
                  <a :href="$router.resolve({name: 'Product', params: { id: product.id, slug: sanitizeTitle(`${product.name}`) }}).href">
                      <p class="font-semibold">{{ truncate(product.name, 15) }}</p>
                  </a>
                </div>
              </div>
            </div>
        </div> -->
      </div>
      <div class="invisible m-10 mx-auto md:visible">
        <img v-if="settings" :src="settings.strings.website.websiteHeaderImage" class="self-center object-cover w-full rounded-xl h-80">
      </div>
    </div>
    
  </div>
  <div class="max-w-6xl px-5 mx-auto ">
    <!-- Categories -->
    <div class="mt-20">
      <Category/>
    </div>

    <!-- best selling -->
    <div class="mt-20">
      <best-selling/>
    </div>

    <div class="mt-20">
      <for-you/>
    </div>

    <div class="mt-20" id="vendor">
      <nearby-vendor/>
    </div>

    <div class="p-5 mt-20" id="services">
        <p class="mb-1 mb-3 text-3xl font-semibold text-center text-green-500 uppercase">What we offer</p>
        <p class="mb-16 text-sm font-light text-center text-gray-600">Your favourite delivery partner</p>
        <div class="grid gap-4 text-center md:grid-cols-3">
          <div>
            <img src="/img/order.png" class="h-48 mx-auto ">
            <h6 class="my-4 text-xl font-semibold capitalize">easy to order</h6>
            <p class="mb-4 text-xs font-light text-center text-gray-700">You only need a few steps <br>  in ordering food</p>
          </div>
          <div class="text-center justify-content-center">
            <img src="/img/rider.png" class="h-48 mx-auto ">
            <h6 class="my-4 text-xl font-semibold capitalize">fast delivery</h6>
            <p class="mb-4 text-xs font-light text-center text-gray-700">Delivery that is always ontime <br> even faster</p>
          </div>
          <div>
            <img src="/img/quality.png" class="h-48 mx-auto ">
            <h6 class="my-4 text-xl font-semibold capitalize">Best quality</h6>
            <p class="mb-4 text-xs font-light text-center text-gray-700">Not only fast for us quality is also <br>numbers</p>
          </div>
        </div>
      </div>
  </div>
      <div class="mt-20">
        <div class=" p-14 bg-gray-50">
          <div class="container max-w-6xl px-5 mx-auto">
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                  <h4 class="text-3xl font-semibold">Get the Foodie App</h4>
                  <p class="pt-5 text-sm font-light text-gray-600">Download our App on play store or App store <br>for a better experience</p>
                  <div class="flex flex-row mt-6" v-if="settings">
                    <a :href="settings.strings.androidDownloadLink" target="__blank"><img src="/img/play-store.png" class=" h-9 md:h-16"/></a>
                    <a :href="settings.strings.iosDownloadLink" target="__blank"><img src="/img/app-store.png" class="h-9 md:h-16"/></a>
                  </div>
              </div>
              <div>
                  <img src="/img/download1.png" class=" rounded-xl"/>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
  <div class="relative w-full max-w-6xl px-5 mx-auto">
    
    <div class="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
     
      <div class="flex items-start justify-between p-2 text-white border-b border-solid rounded-t bg-primary">
        <h3 class="text-3xl font-light">
          Search
        </h3>
        <button class="float-right p-1 ml-auto text-3xl font-semibold leading-none border-0 outline-none focus:outline-none" v-on:click="toggleModal()">
          <span class="block w-6 h-6 text-2xl">
            ×
          </span>
        </button>
      </div>
      <div class="relative flex-auto p-6">
        <div class="flex space-x-2">
          <input type="text" name="search"  v-model="search" placeholder="search product..." class="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm">
          <button @click="getSearchResult" class="px-1 py-2 text-xs rounded-md text-primary bg-primary">
            <SearchIcon class="w-6 h-6 text-primary" aria-hidden="true" />
          </button>
        </div>
       
        <div class="flex flex-col" v-if="products">
          
           <div  v-if="products.length <= 0">
               <p class="mt-5 text-center">No Product</p>
           </div>
           <div v-else class="grid grid-cols-2 gap-4 mt-16 md:grid-cols-4">
                <div class="my-5"  v-for="product in products" :key="product.id">
                    <a :href="$router.resolve({name: 'Product', params: { id: product.id, slug: sanitizeTitle(`${product.name}`) }}).href">
                    <!-- <a :href="`product/${product.id}/`+sanitizeTitle(`${product.name}`)"> -->
                        <img  v-if="product" v-bind:src="product.photo" class="mx-auto rounded-lg h-14 md:h-44">
                        <p class="mt-2 text-xs font-semibold text-center md:text-xl">{{ truncate(product.name, 15) }}</p>
                        <span v-if="product.discount_price > 0">
                        <p class="text-xs text-center text-primary">{{ currency }} <span class="line-through">{{ product.price.toFixed(1) }}</span> <span class="text-xs text-base">{{ product.discount_price.toFixed(1) }}</span></p>
                        </span>
                        <span v-else>
                        <p class="text-xs text-center text-primary ">{{ currency }}{{ product.price }}</p>
                        </span>
                    </a>
                </div>
            </div>
        </div>
      </div>
      
      <!-- <div class="flex items-center justify-between p-6 border-t border-solid rounded-b border-blueGray-200">
        <button class="px-6 py-3 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear bg-transparent outline-none hover:bg-red-500 hover:text-white active:bg-red-600 focus:outline-none" type="button" v-on:click="toggleModal()">
          Close
        </button>
        <button @click="addressSave" class="px-6 py-2 mb-1 mr-1 text-sm font-bold text-green-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none" type="button" v-on:click="toggleModal()">
          Save
        </button>
      </div> -->
    </div>
  </div>
</div>
<div v-if="showModal" class="fixed inset-0 z-40 bg-black opacity-25"></div>
</template>

<script>
import Category from '@/components/Category.vue'
import ForYou from '@/components/ForYou.vue'
import BestSelling from '@/components/BestSelling.vue'
import axios from 'axios'
import NearbyVendor from '@/components/NearbyVendor.vue'
import { SearchIcon } from '@heroicons/vue/outline'
export default {
  name: 'Home',
  components: {
    Category,
    NearbyVendor,
    ForYou,
    BestSelling,
    SearchIcon,
  },
  data () {
    return {
      settings: null,
      banners: null,
      showModal: false,
      search: null,
      products: null,
     
    }
  },
  mounted() {
    let base_url = this.$store.state.baseUrl
    
    axios.get(base_url+'api/app/settings')
      .then(response => (this.settings = response.data))
      .catch(error => console.log(error))

    // axios.get(base_url+'api/banners')
    // .then((response) => {

    //   this.banners = response.data.data
    //   })
    // .catch(error => console.log(error))

  },


  methods: {

    truncate(str, n){
      return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    },

    toggleModal: function(){
      this.showModal = !this.showModal;
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

    getSearchResult()
    {
      let base_url = this.$store.state.baseUrl
      this.$store.commit('loading', true)
      axios.get(base_url+'api/search?keyword='+this.search)
        .then((response) => {
          // console.log(response)
          this.$store.commit('loading', false)
          let search
          search = response.data.products.data
          this.products = search
        })
        .catch(error => console.log(error))
    }

  },
 
}
</script>

