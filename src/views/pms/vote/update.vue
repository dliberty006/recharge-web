<template> 
  <vote-detail :is-edit='true'></vote-detail>
</template>
<script>
  import VoteDetail from './components/VoteDetail'
  export default {
    name: 'updateVote',
    components: { VoteDetail }
  }
</script>
<style>
</style>


