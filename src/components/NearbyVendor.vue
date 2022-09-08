<template>
<div class="px-2">
   <div class="flex justify-between my-10">
     <p class="text-2xl text-gray-700 md:text-4xl">Nearby Vendors</p>
     <!-- <div v-if="location"> -->
      <p class="flex justify-center text-sm font-light text-black">{{ address }}</p>
    <!-- </div> -->
  </div>
  <vue-horizontal responsive>
    <div  v-for="(vendor) in vendors" :key="vendor.id" class="grid grid-cols-1 gap-4 px-5">
      <a :href="`vendor/${vendor.id}/`+sanitizeTitle(`${vendor.name}`)" class="h-56 md:w-96 md:h-full w-44">
        <img  v-if="vendor" v-bind:src="vendor.feature_image" class="h-24 shadow-md w-44 md:h-56 md:w-96 rounded-t-xl">
        <div class="p-3 shadow-md bg-gray-50 rounded-b-xl">
            <p class="mt-2 mb-1 font-semibold truncate">{{ vendor.name }}</p>
            <p class="text-xs font-light text-gray-700 truncate">{{ vendor.address}}</p>
        </div>
      </a>
    </div>
  </vue-horizontal>
</div>
 
</template>
<script>
import VueHorizontal from "vue-horizontal";
import axios from 'axios'
export default {
  name: 'Vendors',
  components: {
    VueHorizontal,
  },
  
  data () {
    return {
      vendors: null,
      settings: null,
      places: [],
      currentPlace: null,
      marker: [],
      location: null,
      address: '',
      // latLong: null
    }
  },
  
  mounted () {
    let base_url = this.$store.state.baseUrl
    let location
    navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          
        }
        location = this.marker.position
        let lati = location.lat
        let long = location.lng
        // console.log('lat', lati, 'long', long );
         axios.get(base_url+'api/vendors?lat='+lati+'&long='+long)
        .then((response) => {
          this.vendors = response.data.data
          }
          
        )
        .catch(error => console.log(error))
    })

    this.getStreetAddressFrom()
    
    navigator.geolocation.getCurrentPosition(
      position => {
        let lat = position.coords.latitude
        let long = position.coords.longitude
         this.getStreetAddressFrom(lat, long)
      },
      error => {
         console.log(error.message);
      }
   )

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

    truncate(str, n){
      return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    },


    getStreetAddressFrom(lat, long) 
      {
        navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          
        }
        let geolacat = this.marker.position
                // lat
                // lat = this.geolocate.lat
                long = geolacat.lng
                lat = geolacat.lat

                  axios.get(
                    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                    lat +
                    "," +
                    long +
                    "&key=AIzaSyCpC_EvzUOBP8LxwaEU75dtoP8_hIIfPlM"
                  )
                  .then((response) => {
                    this.address = response.data.results[0].formatted_address;
                    
                    }
                    
                  )
                  .catch(error => console.log(error))
                  // if (data.error_message) {
                  //   console.log(data.error_message)
                  // } else {
                  //   this.address = data.results[0].formatted_address;
                  // }

        })
             
        
    }
  },

}
</script>
