<template> 
  <span>{{value}}</span>
</template>
<script>
  import {valueSetWrite} from '@/api/valueSet'

  export default {
    name: 'valueWrite',
    props: ['groupkey','code'],
    data() {
      return {
        value:'',
        params: {
          code:'',
          key:''
        },
      };
    },
    created() {
      this.params.code = this.code
      this.params.key = this.groupkey
      this.write();
    },
    computed: {
      
    },
    methods: {
      write() {
        this.listLoading = true;
        valueSetWrite(this.params).then(response => {
          this.listLoading = false;
          this.value = response.valueData.valuesetValue
        });
      }
    }
  }
</script>
<style>

</style>


