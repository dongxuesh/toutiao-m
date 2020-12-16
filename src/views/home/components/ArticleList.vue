<template>
  <div class="article-list">
    <!--下拉刷新-->
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text = 'successText'
      :success-duration = '1500'
     @refresh="onRefresh">
      <!--上拉加载-->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem v-for="(article,index) in articles" :key="index" :articleInfo='article'/>
      </van-list>
     </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/channel'
import ArticleItem from '@/components/article-item.vue'
 export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: '',
      isRefreshLoading: false,
      successText: '' // 刷新成功后的提示信息
    }
  },
 computed: {},
 watch: {},
 created () {},
 mounted () {},
 methods: {
   // 每次下拉的时候都会调用
   async onLoad() {
     let param = {
       channel_id: this.channel.id,
       timestamp: this.timestamp|| Date.now(),
       with_top: 1
     }
     const { data:res } = await getArticles(param)
     if(res && res.data) {
       console.log('resInfo',res)
        this.articles.push(...res.data.results) // 重点 合并数组
        console.log('res',this.articles)
     }
     this.loading = false // 加载结束
     if(res.data.results.length){
        this.timestamp = res.data.pre_timestamp
     }else{
        this.finished = true
     }
   },
   async onRefresh() {
     let param = {
       channel_id: this.channel.id,
       timestamp: Date.now(),
       with_top: 1
     }
     const { data:res } = await getArticles(param)
     if(res && res.data) {
       this.articles.unshift(...res.data.results)
     }
     this.isRefreshLoading = false
     this.successText = `更新了${res.data.results.length}条数据`
   }
 }
}
</script>

<style lang="less" scoped>
.article-list {
   position: fixed;
   left: 0;
   right: 0;
   top: 90px;
   bottom: 50px;
   overflow-y: auto;
}
</style>
