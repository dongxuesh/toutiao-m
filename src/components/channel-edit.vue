<template>
  <div class="channel-edit">
   <van-cell center :border='false'>
      <div slot='title' class='channel-title'>我的频道</div>
      <van-button type='danger' round size='mini' plain>编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for='(item,index) in userChannelList'
      :text="item.name"
      :key='index'
      class='grid-item'
      />
    </van-grid>
    <van-cell center :border='false'>
       <div slot='title' class='channel-title'>频道推荐</div>
     </van-cell>
     <van-grid :gutter="10">
       <van-grid-item
       text="文字"
       class='grid-item'
       />
     </van-grid>
  </div>
</template>

<script>
export default {
  name: 'channelEdit',
  components: {},
  props: {
    userChannelList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {

    }
  },
 computed: {},
 watch: {},
 created () {
   console.log('111',this.userChannelList)
 },
 mounted () {},
 methods: {}
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top:54px;
  .channel-title {
    font-size:16px;
    color:#333;
  }
  .grid-item {
    width:80px;
    height:43px;
    /deep/.van-grid-item__content{
      background:#f4f5f6;
      .van-grid-item__text {
        font-size:14px;
        color:#222;
      }
    }
  }
}
</style>
