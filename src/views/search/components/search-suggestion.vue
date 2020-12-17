<template>
  <div class="search-suggestion">
    <van-cell
    v-for='(suggestion,index) in suggestions'
    :key='index'
    :title='suggestion'
    icon='search'
    ></van-cell>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions:[]
    }
  },
 computed: {},
 watch: {
   searchText: {
     handler: debounce(async function() {
       const { data:res } = await getSuggestions(this.searchText)
       if(res && res.data) {
         this.suggestions = res.data.options
       }
     },1000),
     immediate:true
   }
 },
 created () {},
 mounted () {},
 methods: {}
}
</script>

<style lang="less" scoped>

</style>
