<template>
   <div>
     <button class="px-6 py-3 text-green-500 uppercase border border-gray-100 rounded" @click="navigatePrevious" v-show="!isFirst()">
       previous
     </button>

     <button class="px-6 py-3 text-white uppercase bg-green-500 rounded" @click="navigateNext">
       {{ nextButtonText() }}
     </button>
   </div>
</template>
<script>
export default {
  methods: {
    nextButtonText()
    {
      if (
        this.$route.name === 'payment' || this.$route.name === 'summary' && !this.$store.state.PaymentStep
        )
      {
        return 'Finish';
      }
      return 'Next';
    },

    isFirst()
    {
      return this.$route.name === 'Packagetype'
    },

    navigateNext()
    {
      if(
        this.$route.name === 'payment' || this.$route.name === 'summary' && !this.$store.state.PaymentStep
      )
      {
        alert('it is finished');
      }
      // this.$router.push('/' + (++CurrentStep))
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
        this.$router.push('/package-types');
      }
    },
  
  }
}
</script>
