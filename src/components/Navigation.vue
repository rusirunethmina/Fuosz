<template>
   <div class="flex justify-between">
     <span v-if="this.$route.name === 'payment' | this.$route.name === 'recipientInfo' | this.$route.name === 'packageparameter' | this.$route.name === 'summary'">
     <button class="mr-5 text-green-500 uppercase border border-gray-300 rounded md:px-6 md:py-3" @click="navigatePrevious" v-show="!isFirst()">
       previous
     </button>
     </span>

     <button class="px-6 py-3 text-white uppercase bg-green-500 rounded" @click="navigateNext">
       {{ nextButtonText() }}
     </button>
   </div>
</template>
<script>
export default {
  props: {
    pParams: null,
  },
  methods: {
    nextButtonText()
    {
      if (
        this.$route.name === 'payment' && !this.$store.state.PaymentStep
        )
      {
        return 'Place Order';
      }
      return 'Next';
    },

    isFirst()
    {
      return this.$route.name === 'Packagetype'
    },

    navigateNext()
    {
      if(this.$route.name === 'payment' && !this.$store.state.PaymentStep)
      {
        alert('it is finished');
      }
       if (this.$route.name === 'packagetype')
      {
        this.$router.push('/recipient');
        
      } else if(this.$route.name === 'recipientInfo')
      {
        this.$router.push('/package-parameters');

      }else if(this.$route.name === 'packageparameter')
      {
        this.$router.push('/summary');

      }else if(this.$route.name === 'summary')
      {
        this.$router.push('/payments');
      }
    },

    navigatePrevious()
    {
      if (this.$route.name === 'payment')
      {
        this.$router.push('/summary');
        
      } else if(this.$route.name === 'summary')
      {
        this.$router.push('/package-parameters');

      }else if(this.$route.name === 'packageparameter')
      {
        this.$router.push('/recipient');

      }else if(this.$route.name === 'recipientInfo')
      {
        this.$router.push('/package-types');
      }
    },
  
  }
}
</script>
