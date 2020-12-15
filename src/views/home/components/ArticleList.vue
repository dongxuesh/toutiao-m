<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(article,index) in articles" :key="index" :title='article.title'/>
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/channel'

export default {
  name: 'ArticleList',
  components: {},
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
      timestamp: Date.now()
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
       timestamp: this.timestamp,
       with_top: 1
     }
     const { data:res } = await getArticles(param)
     if(res && res.data) {
        this.articles.push(...res.data.results) // 重点 合并数组

     }
     this.loading = false // 加载结束
     if(res.data.results.length){
        this.timestamp = res.data.pre_timestamp
     }else{
        this.finished = true
     }
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
