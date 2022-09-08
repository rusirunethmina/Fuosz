<template>
  <div class="flex justify-between mb-5">
    <p class="text-2xl text-gray-700 md:text-4xl">Categories</p>
    <div v-if="categoriesToShow < categories.length || categories.length > categoriesToShow">
      <button @click="categoriesToShow += 6" class="items-center justify-center text-sm font-light">Show more</button>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-4 md:grid-cols-6 place-items-center" v-if="categoryIndex < categories.length">
    <div v-for="categoryIndex in categoriesToShow" :key="categoryIndex.id">
      <a :href="`category/${categories[categoryIndex].id}/`+sanitizeTitle(`${categories[categoryIndex].name}`)">
          <div  class="p-3 my-5 border border-gray-200 rounded-lg w-28 h-38">
              <img v-bind:src="categories[categoryIndex].photo" :alt="categories[categoryIndex].name" class="self-center mx-auto w-14 text-smallest">
              <p class="mt-2 text-sm font-semibold text-center text-gray-600 truncate ">{{ categories[categoryIndex].name }}</p>
             
          </div>
      </a>
    </div>
  </div>
  <span class="flex justify-center" >
    <button v-if="categoriesToShow > 6" @click="categoriesToShow -= 6" class="text-sm font-light text-black">Show less</button>
  </span>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Category',
  components: {
  },
  
  data () {
    return {
      categories: [],
      categoriesToShow: 6,
      categoryIndex: 6,
    }
  },
  mounted () {
    let base_url = this.$store.state.baseUrl

    this.$store.commit('loading', true)

    axios.get(base_url+'api/categories')
    .then((response) => {
      this.$store.commit('loading', false),
      this.categories = response.data.data
      // console.log(this.categories)
    })

  },
  methods: {

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
