<template>
  <div class="search-result">
    <van-list
      class='result-list'
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getResults } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      per_page:10
    }
  },
 computed: {},
 watch: {},
 created () {},
 mounted () {},
 methods: {
    async onLoad () {
      const {data:res} = await getResults({
        page:this.page,
        per_page:this.per_page,
        q:this.searchText
      })
      if(res && res.data) {
        this.list.push(...res.data.results)
      }
      this.loading = false
      if(res.data.results.length){
        this.page++
      }else{
        this.finished=true
      }
   }
 }
}
</script>

<style lang="less" scoped>
.search-result{
  .result-list{
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
  }
}
</style>
