<template> 
  <signup-detail :is-edit='false'></signup-detail>
</template>
<script>
  import SignupDetail from './components/SignupDetail'
  export default {
    name: 'addSignup',
    components: { SignupDetail }
  }
</script>
<style>
</style>


