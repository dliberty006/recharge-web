<template> 
  <vote-detail :is-edit='false'></vote-detail>
</template>
<script>
  import VoteDetail from './components/VoteDetail'
  export default {
    name: 'addVote',
    components: { VoteDetail }
  }
</script>
<style>
</style>


