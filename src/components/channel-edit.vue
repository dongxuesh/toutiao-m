<template>
  <div class="channel-edit">
   <van-cell center :border='false'>
      <div slot='title' class='channel-title'>我的频道</div>
      <van-button type='danger' round size='mini' plain @click='isEdit=!isEdit'>{{isEdit?'编辑':'完成'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for='(item,index) in userChannelList'
      :icon="(isEdit && index !== 0)?'clear':''"
      :text="item.name"
      :key='index'
      class='grid-item'
      :class="{'active':index === active}"
      @click='removeItem(index)'
      />
    </van-grid>
    <van-cell center :border='false'>
       <div slot='title' class='channel-title'>频道推荐</div>
     </van-cell>
     <van-grid :gutter="10">
       <van-grid-item v-for='(item,index) in recommendList'
       :key='index'
       :text="item.name"
       class='grid-item'
       @click='addChannnel(item)'
       />
     </van-grid>
  </div>
</template>

<script>
import {getAllchannels,addUserChannel} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'channelEdit',
  components: {},
  props: {
    userChannelList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannelList: [],
      isEdit: false
    }
  },
 computed: {
   ...mapState(['user']),
   recommendList() {
     return this.allChannelList.filter(channel => {
       return !this.userChannelList.find(userChannel => {
         return userChannel.id === channel.id
       })
     })
   },

 },
 watch: {},
 created () {
   this.getAllData()
 },
 mounted () {},
 methods: {
   async getAllData() {
     const {data:res} = await getAllchannels()
     this.allChannelList = res.data.channels
   },
   async addChannnel (item) {
     this.userChannelList.push(item)
     console.log(this.user)
     // 做数据持久化
     if(this.user) {
       // 数据存储到线上  接口有问题
       await addUserChannel({
         channels: [
           {id:item.id,seq:this.userChannelList.length}
         ]
       })
     }else{
       // 未登录 数据存储到本地
       setItem('user-channel',this.userChannelList)
     }
   },
   removeItem (index) {
    if(this.isEdit && index!==0) {
      this.$emit('update-active',this.active -1)
      this.userChannelList.splice(index,1)
      setItem('user-channel',this.userChannelList)
    }else{
      this.$emit('close')
      this.$emit('update-active',index)
    }
   }
 }
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
        margin-top:0;
      }
      .van-icon{
        position: absolute;
        top: -6px;
        right: -7px;
        color: #ccc;
        font-size: 20px;
      }
    }
  }
  .active {
    /deep/.van-grid-item__text {
      color:red !important;
    }
  }
}
</style>
