<template> 
  <signup-detail :is-edit='true'></signup-detail>
</template>
<script>
  import SignupDetail from './components/SignupDetail'
  export default {
    name: 'updateSignup',
    components: { SignupDetail }
  }
</script>
<style>
</style>


