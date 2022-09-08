
<template>
<!-- max-w-7xl -->
  <Disclosure as="nav" class="fixed top-0 z-50 w-full shadow-sm bg-primary h-18" v-slot="{ open }">
       <div class="container max-w-6xl px-5 pt-2 pb-3 mx-auto">
      <div class="relative flex items-center justify-between">
        <div class="flex items-center flex-shrink-0 invisible md:visible" v-if="settings" >
          <router-link to="/">
            <p class="text-3xl font-semibold text-primary">{{ settings.strings.app_name }}</p>
          </router-link>
        </div>
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block w-4 h-4" aria-hidden="true" />
            <XIcon v-else class="block w-4 h-4" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex items-center flex-1 sm:justify-start md:hidden" v-if="settings" >
          <router-link to="/">
            <p class="font-bold text-center text-primary ">{{ settings.strings.app_name }}</p>
            </router-link>
        </div>
        <div class="flex items-center justify-center ">
          
          <div class="content-center hidden px-5 py-3 rounded-md sm:block sm:ml-6">
            <div class="flex content-center justify-center float-right space-x-4">
              <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? ' ' : '', 'px-3 font-eina font-semibold text-primary py-2 text-smaller']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
              <!-- <span v-show="!isLoggedIn">
                <a href="/register" class="block px-3 py-2 font-semibold text-primary font-eina text-smaller">Signup</a>
              </span> -->
              <!-- <span v-show="isLoggedIn">
                <a href="/package-types" class="block px-3 py-2 font-semibold text-black hover:text-green-500">Send Package</a> 
              </span> -->

            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-1 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          
          <!-- <button v-if="this.$route.name == 'Home'" v-on:click="toggleModal()" class="relative inline-block px-2 py-2 md:mr-4 md:font-semibold md:px-2 md:py-2 md:text-xl">
            <SearchIcon class="w-4 h-4 text-primary md:w-6 md:h-6" aria-hidden="true" />
            
          </button> -->
          <a href="/cart" class="relative flex inline-block px-2 py-2 md:mr-4 md:font-semibold md:px-2 md:py-2 md:text-xl">
            <ShoppingBagIcon class="w-4 h-4 text-primary md:w-6 md:h-6" aria-hidden="true" />
            <!-- <ShoppingCartIcon class="w-4 h-4 text-black md:w-6 md:h-6" aria-hidden="true" /> -->
            <span class="absolute inline-flex items-center justify-center px-1 text-xs font-light leading-none transform translate-x-1/2 -translate-y-1/2 bg-green-400 rounded-full text-primary">{{ cartItemCount }}</span>
            <span class="block px-3 font-semibold text-primary font-eina text-smaller">Cart</span>
            
          </a>
          <span v-show="!isLoggedIn" class="flex">
            <a href="/login" class="flex px-1 py-2 md:font-semibold md:px-6 md:py-2 md:text-xl">
              <UserCircleIcon class="w-4 h-4 text-primary md:w-6 md:h-6" aria-hidden="true" />
              <span class="block px-3 font-semibold text-primary font-eina text-smaller"> Sign In</span>
            </a>
            
          </span>
          
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3" v-show="isLoggedIn">
              <div>
                <MenuButton class="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span class="sr-only">Open user menu</span>
                  <img class="w-4 h-4 rounded-full md:w-8 md:h-8" v-if="user" v-bind:src="user.photo" alt="user photo" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                <MenuItems class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                    <a href="/profile" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black']">Your Profile</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="/orders" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black']">Orders</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="#" @click="logout" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black']">Sign out</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-1 pt-2 pb-3 space-y-1">
        <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'text-sm text-green-500' : 'text-primary hover:text-white', 'block px-3 text-sm py-2 rounded-md font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
      </div>
    </DisclosurePanel>
    </div>
   
  </Disclosure>

  <!-- modal -->
<div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto ">
  <div class="relative w-full max-w-6xl px-5 mx-auto">
    
    <div class="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg ">
     
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
          <button @click="getSearchResult" class="px-1 py-2 text-xs rounded-md text-primary bg-primary"><SearchIcon class="w-6 h-6 text-primary" aria-hidden="true" /></button>
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
import axios from 'axios'
import { mapActions } from "vuex";
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { MenuIcon, XIcon, UserCircleIcon, ShoppingBagIcon, SearchIcon } from '@heroicons/vue/outline'
import { ShoppingCartIcon } from '@heroicons/vue/solid'


const navigation = [
  { name: 'Home', href: '/', current: false},
  { name: 'Vendors', href: '#vendor', current: false },
  { name: 'Services', href: '#services', current: false }
]

export default {
  data () {
    return {
        isLoggedIn: false,
        user: null,
        settings: null,
        showModal: false,
        search: null,
        products: null,
        currency: null
    }
  },
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ShoppingCartIcon,
    SearchIcon,
    // BellIcon,
    MenuIcon,
    UserCircleIcon,
    ShoppingBagIcon,
    XIcon,
  },
  setup() {
    const open = ref(false)

    return {
      navigation,
      open,
    }
  },

  mounted() {
    let base_url = this.$store.state.baseUrl
    this.$store.commit('loading', true)
    axios.get(base_url+'api/app/settings')
    .then((response) => {
      this.$store.commit('loading', false)
      this.settings = response.data
    })
    .catch(error => console.log(error))

    if (localStorage.getItem("authToken")) {
      this.isLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem("user"))
    }
  },

  computed: {
    cartItemCount() {
      return this.$store.getters.count;
    }
  },

  methods: {
    ...mapActions("auth", ["sendLogoutRequest", "getUserData"]),

    logout() {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      this.$router.push("/");
      window.location.href = "/login";
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
};
</script>