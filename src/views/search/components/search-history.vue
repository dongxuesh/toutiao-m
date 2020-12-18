<template>
  <div class="search-history">
    <van-cell title='搜索历史'>
      <div v-if='isDeleteShow'>
        <span style='padding-right:10px;' @click="$emit('deleteAll',[])">全部删除</span>
        <span @click='isDeleteShow = false'>完成</span>
      </div>
      <van-icon name="delete" v-else @click='isDeleteShow = true'/>
    </van-cell>
    <van-cell
    v-for="(item,index) in searchHistorys"
    :key='index'
    :title='item'
    @click='onDelete(item,index)'
    >
      <van-icon name="close" v-if='isDeleteShow'/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistorys: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
 computed: {},
 watch: {},
 created () {},
 mounted () {},
 methods: {
   onDelete(item,index) {
     // 删除历史记录功能
     // 删除状态删除历史记录 非删除状态跳转到搜索页面
     // 本地记录删除 线上历史记录删除调接口
    if(this.isDeleteShow) {
      this.searchHistorys.splice(index,1)
      return
    }
    this.$emit('search',item)
   }
 }
}
</script>

<style lang="less" scoped>

</style>
