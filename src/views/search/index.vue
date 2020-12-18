<template>
  <div class="search-container">
    <!--搜索栏-->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @focus='isResultShow=false'
        @search="onSearch(searchText)"
        @cancel="$router.back()"
      />
    </form>
    <!--搜索结果-->
    <search-result v-if='isResultShow' :search-text='searchText'/>
    <!--联想建议-->
    <search-suggestion
    v-else-if='searchText'
    :search-text='searchText'
    @search="onSearch"/>
    <!--历史记录-->
    <search-history v-else
    :search-historys='searchHistorys'
    @search="onSearch"
    @deleteAll="searchHistorys = $event"/>


  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem,getItem } from '@/utils/storage'
import { mapState } from 'vuex'
import { getHistorys } from '@/api/search'

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
      isResultShow: false, // 用于展示搜索结果
      searchHistorys: [] // 搜索历史记录
    }
  },
 computed: {
   ...mapState(['user'])
 },
 watch: {
   // 使用监听做数据持久化 是为了方便简化 push、delete 分别做就持久化
   searchHistorys() {
      setItem('user-historys',this.searchHistorys)
   }
 },
 created () {
   this.getHistoryData()
 },
 mounted () {},
 methods: {
   onSearch (searchText) {
     this.searchText = searchText
     this.searchHistorys.push(searchText)
     // 数据持久化
     const index = this.searchHistorys.indexOf(searchText)
     if(index !== -1) {
       this.searchHistorys.splice(index,1)
     }
     // 把最新的所搜记录放在顶部 知识点：unshift
     this.searchHistorys.unshift(searchText)
     // setItem('user-historys',this.searchHistorys)
     this.isResultShow = true
   },
   async getHistoryData () {
    // 获取搜索记录
    let historys = getItem('user-historys') || []
    // 登录通过接口获取
    // if(this.user) {
    //   const {data:res} = await getHistorys()
    //   // console.log('历史信息', res.data.keywords)
    //   // 接口过来的历史记录 会 和本地的历史记录重复  知识点：ES6 数组去重
    //    historys = [...new Set([...historys,...res.data.keywords])]
    // }
    this.searchHistorys = historys
   }
 }
}
</script>

<style lang="less" scoped>

</style>
