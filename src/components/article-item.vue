<template>
  <div class="article-item">
    <van-cell :to="{
      name:'article',
      params:{
        articleId:articleInfo.art_id
      }
    }">
      <div slot='title' class='van-multi-ellipsis--l3'>{{articleInfo.title}}</div>
      <div slot='label'>
        <div class='cover-warp' v-if='articleInfo.cover.images.length === 3'>
          <div class='cover-warp-item' v-for='(item,index) in articleInfo.cover.images' :key='index'>
            <van-image class='cover-warp-item-img'
              fit='cover'
              :src='item'
            />
          </div>
        </div>
        <div class='comm-wrap'>
          <span>{{articleInfo.aut_name}}</span>
          <span>{{articleInfo.comm_count}}条评论</span>
          <span>{{articleInfo.pubdate | relativeTime}}</span>
        </div>
      </div>
      <div v-if='articleInfo.cover.images.length === 1'>
        <van-image
          class='article-item-img'
          fit='cover'
          :src='articleInfo.cover.images[0]'
        />
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
 computed: {},
 watch: {},
 created () {},
 mounted () {},
 methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  /deep/.van-cell__value {
    flex: unset;
  }
  .article-item-img {
    width:116px;
    height:73px;
  }
  .cover-warp {
    display:flex;
    padding:15px 0;
    .cover-warp-item {
      .cover-warp-item-img {
        width:116px;
        height:73px;
      }
      &:not(:last-child) {
        padding-right:4px;
      }
    }
  }
  .comm-wrap {
    span {
      margin-right:10px;
    }
  }
}
</style>
