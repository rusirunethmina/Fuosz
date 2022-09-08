<template>
  <div class="px-2">
    <div class="flex justify-between my-10">
      <p class="text-2xl text-gray-700 md:text-4xl">Best Selling</p>
      <!-- <div>
        <nav>
          <button @click="prev" :class="{'active': hasPrev, 'inactive': !hasPrev}">
            <svg viewBox="0 0 24 24">
              <path d="m9.8 12 5 5a1 1 0 1 1-1.4 1.4l-5.7-5.7a1 1 0 0 1 0-1.4l5.7-5.7a1 1 0 0 1 1.4 1.4l-5 5z"/>
            </svg>
          </button>
          <button @click="next" :class="{'active': hasNext, 'inactive': !hasNext}">
            <svg viewBox="0 0 24 24">
              <path d="m14.3 12.1-5-5a1 1 0 0 1 1.4-1.4l5.7 5.7a1 1 0 0 1 0 1.4l-5.7 5.7a1 1 0 0 1-1.4-1.4l5-5z"/>
            </svg>
          </button>
        </nav>
      </div> -->
    </div>
    
    <vue-horizontal ref="horizontal" class="horizontal" responsive v-if="products">
        
        <div v-for="product in products" :key="product.id" class="grid grid-cols-1 gap-4 px-5 item">
          
          <a :href="`product/${product.id}/`+sanitizeTitle(`${product.name}`)">
            <img  v-if="product" v-bind:src="product.photo" class="object-contain w-full h-20 border rounded-t-xl md:h-28">
            <div class="p-1 shadow-sm bg-gray-50 rounded-b-xl">
              <p class="font-semibold text-center truncate">{{ truncate(product.name, 15) }}</p>
              <span v-if="product.discount_price > 0">
                <p class="text-xs text-center text-gray-700 ">{{ currency }} <span class="line-through">{{ product.price.toFixed(1) }}</span> <span class="text-base">{{ product.discount_price.toFixed(1) }}</span></p>
              </span>
              <span v-else>
                <p class="mt-1 text-xs text-center text-gray-700">{{ currency }}{{ product.price.toFixed(2) }}</p>
              </span>
            </div>
            
          </a>
        </div> 
    </vue-horizontal>
    
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
      currency: null,
      hasPrev: false,
      hasNext: true,
      index: 0,
      interval: null,
      forward: true,
        
    }
  },
  mounted () {
    this.getCurrency()

    let base_url = this.$store.state.baseUrl

    axios.get(base_url+'api/products?type=best')
    .then(response => (this.products = response.data.data))

  },

 destroyed() {
    clearInterval(this.interval)
  },

  methods: {
    onScrollDebounce({hasNext, hasPrev}) {
      this.hasPrev = hasPrev
      this.hasNext = hasNext
    },
    play() {
      // Check if direction need to be reversed
      if (this.hasNext !== this.hasPrev) {
        this.forward = !this.forward
      }

      if (this.forward && this.hasNext) {
        this.$refs.horizontal.next()
      } else if (!this.forward && this.hasPrev) {
        this.$refs.horizontal.prev()
      }
    },
    prev() {
      this.$refs.horizontal.prev()
    },


    next() {
      this.$refs.horizontal.next()
    },
    
    onScrollDebounce({hasPrev, hasNext}) {
      this.hasPrev = hasPrev
      this.hasNext = hasNext
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
<style scoped>

nav {
  display: flex;
  align-items: center;
}

svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
  color: black;
}

button.inactive svg {
  color: #BBB;
}

button {
  padding: 4px;
}

button:focus {
  outline: none;
}
</style>
<style scoped>
.horizontal {
  --count: 2;
  --gap: 16px;
}

@media (min-width: 640px) {
  .horizontal {
    --count: 3;
    --gap: 24px;
  }
}

@media (min-width: 768px) {
  .horizontal {
    --count: 4;
  }
}

@media (min-width: 1024px) {
  .horizontal {
    --count: 5;
  }
}

@media (min-width: 1280px) {
  .horizontal {
    --count: 6;
  }
}

.item {
  width: calc((100% - ((var(--count) - 1) * var(--gap))) / var(--count));
  margin-right: var(--gap);
}
</style>