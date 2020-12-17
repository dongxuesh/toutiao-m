<template>
  <div class="search-container">
    <!--搜索栏-->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @focus='isResultShow=false'
        @search="onSearch"
        @cancel="$router.back()"
      />
    </form>
    <!--搜索结果-->
    <search-result v-if='isResultShow'/>
    <!--联想建议-->
    <search-suggestion v-else-if='searchText' :search-text='searchText'/>
    <!--历史记录-->
    <search-history v-else/>


  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'

export default {
  name: 'searchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText:'',
      isResultShow: false // 用于展示搜索结果
    }
  },
 computed: {},
 watch: {},
 created () {},
 mounted () {},
 methods: {
   onSearch () {
     console.log('onSearch')
     this.isResultShow = true
   }
 }
}
</script>

<style lang="less" scoped>

</style>
