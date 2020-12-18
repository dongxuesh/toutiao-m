<template>
  <div class="search-suggestion">
    <van-cell
    v-for='(str,index) in suggestions'
    :key='index'
    icon='search'
    @click="$emit('search',str)"
    >
      <div slot='title' v-html='heightlignt(str)'></div>
    </van-cell>
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
     },50),
     immediate:true
   }
 },
 created () {},
 mounted () {},
 methods: {
   heightlignt(str) {
     const reg = new RegExp(this.searchText,'gi')
     return str.replace(reg,`<span style='color:red;'>${this.searchText}</span>`)
   }
 }
}
</script>

<style lang="less" scoped>

</style>
