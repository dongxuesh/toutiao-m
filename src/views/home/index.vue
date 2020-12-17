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
        to='search'
        class='search-btn'>搜索</van-button>
     </van-nav-bar>
     <!--频道列表-->
     <!--标签页组件有一个功能，只有第1次查看标签页的时候才会渲染里面的内容-->
     <van-tabs v-model="active">
       <van-tab v-for='(item) in channelList' :key='item.id' :title='item.name'>
         <ArticleList :channel='item'/>
       </van-tab>
       <!--汉堡按钮定位把列表最后的位置给挡住了，解决办法的就是在这里添加一个占位元素 占位元素的宽度就是汉堡按钮的宽度-->
       <div slot='nav-right' style='width:24px; flex-shrink:0;'></div>
       <div slot='nav-right' class='wap-nav-right' @click='popupshow=true'>
        <van-icon name="wap-nav" />
       </div>
     </van-tabs>
     <!--设置弹出层 最好的方式是将 dom 挂载到 body 上 不属于任何组件的子组件-->
     <van-popup
       v-model="popupshow"
       closeable
       close-icon-position="top-left"
       get-container="body"
       position="bottom"
       class='channel-edit-popup'
       style='height:100%'
    >
      <channel-edit
      :userChannelList='channelList'
      :active='active'
      @close='popupshow=false'
      @update-active='active = $event'/>
    </van-popup>
  </div>
</template>

<script>
import { getChannel } from '@/api/channel'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from '../../components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active:0,
      channelList:[],
      popupshow: false
    }
  },
 computed: {
   ...mapState(['user'])
 },
 watch: {},
 created () {
  this.getData()
 },
 mounted () {},
 methods: {
    async getData(){
      // 判断是否已经登录 请求获取线上用户频道
      if(this.user) {
        const {data:res} = await getChannel()
        if(res && res.data) {
          this.channelList = res.data.channels
        }
      }else{
        if(getItem('user-channel')) {
          this.channelList = getItem('user-channel')
        }else {
          const {data:res} = await getChannel()
          if(res && res.data) {
            this.channelList = res.data.channels
          }
        }
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
  .wap-nav-right {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 0;
    height: 43px;
    background:#fff;
    opacity: .9;
    &::before {
      content:'';
      width:1px;
      height:36px;
      background:#ccc;
    }
  }
}
</style>
