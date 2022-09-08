<template>
<div class="bg-black ">
    <div class="container max-w-6xl p-5 mx-auto ">
        <div class="items-center font-light sm:flex-row w-fw desktop:px-0">
            <div class="flex flex-col py-5 md:justify-between md:flex-row" v-if="settings">
                
                <a href="/" class="mb-3 font-semibold text-primary md:self-center md:text-center md:text-3xl" >{{ settings.strings.app_name }}</a>
                
                <div class="flex flex-col mb-3 md:self-center md:flex-row md:space-x-2 text-primary">
                    <!-- <p class="mb-3 font-semibold uppercase">Let us help you</p> -->
                    <a class="text-sm hover:underline" target="__blank" :href="`${this.$store.state.baseUrl}pages/contact`">Contact Us</a>
                    <a class="text-sm hover:underline" target="__blank" :href="`${this.$store.state.baseUrl}privacy/policy`">Privacy Policy</a>
                    
                </div>
                <div class="flex flex-row mb-3 space-x-2 md:self-center">
                    <a :href="settings.strings.website.social ? settings.strings.website.social.fbLink: '#'"><img src="/img/icons/facebook.svg" class="w-4 h-4 " alt=""></a>
                    <a :href="settings.strings.website.social ? settings.strings.website.social.igLink: '#'"><img src="/img/icons/instagram.svg" class="w-4 h-4" alt=""></a>
                    <a :href="settings.strings.website.social ? settings.strings.website.social.twLink: '#'"><img src="/img/icons/twitter.svg" class="w-4 h-4" alt=""></a>
                </div>
                
                
            </div>
            <div class="py-4 text-xs font-light text-white border-t md:text-center">
                Copyright &copy; {{new Date().getFullYear()}}<span class="ml-1">Edentech. All rights reserved.</span>
            </div>
        </div>
    </div>   
</div>

 <!-- <cookie-law theme="blood-orange" 
    buttonText="I understand" 
    position="top" 
    transitionName="fade"
    >
</cookie-law> -->

</template>
<script>
import axios from 'axios'

// import CookieLaw from 'vue-cookie-law'
export default {
  data () {
    return {
        settings: null
    }
  },
  components: {
    //   CookieLaw 
  },

  mounted() {
      let base_url = this.$store.state.baseUrl
      this.$store.commit('loading', true)
    axios.get(base_url+'api/app/settings')
        .then((response) => {
            this.$store.commit('loading', false)
            this.settings = response.data
            // console.log(this.settings)
        })
        .catch(error => console.log(error))
   
  },

};
</script>