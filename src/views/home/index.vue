<template>
  <div class="home-container">
    <!--导航栏设置-->
     <van-nav-bar class='home-nav-bar'>
        <van-button
        icon="search"
        type="info"
        slot='title'
        size='small'
        round
        class='search-btn'>搜索</van-button>
     </van-nav-bar>
     <!--频道列表-->
     <!--标签页组件有一个功能，只有第1次查看标签页的时候才会渲染里面的内容-->
     <van-tabs v-model="active">
       <van-tab v-for='(item) in channelList' :key='item.id' :title='item.name'>
         <ArticleList :channel='item'/>
       </van-tab>
     </van-tabs>
  </div>
</template>

<script>
import { getChannel } from '@/api/channel'
import ArticleList from './components/ArticleList.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active:0,
      channelList:[]
    }
  },
 computed: {},
 watch: {},
 created () {
  this.getData()
 },
 mounted () {},
 methods: {
    async getData(){
      const {data:res} = await getChannel()
      console.log('频道信息',res)
      if(res && res.data) {
        this.channelList = res.data.channels
      }
    }
 }
}
</script>

<style lang="less" scoped>
.home-container {
  .home-nav-bar {
    background:cornflowerblue;
    /deep/.van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 277px;
      height: 32px;
      background: #5babfb;
      border: none;
    }
  }
}
</style>
