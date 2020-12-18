<template>
  <div class="article-container">
    <!--文章列表导航-->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <h1 class='nav-title'>牛逼程序员都用的开发工具，你用了介个？</h1>
    <van-cell center class='nav-bar'>
      <van-image
      class='nav-img'
      slot='icon'
      width="35"
      height="35"
      round
      src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <div slot='title'>天涯小型可</div>
      <span slot='label'>1小时前</span>
      <van-button
      class='nav-btn'
      type="info"
      round
      size='small'
      icon='plus'
      >关注</van-button>
    </van-cell>
    <div class='content markdown-body'>

    </div>
  </div>
</template>

<script>
export default {
  name: 'articleIndex',
  components: {},
  props: {
    articleId: {
      type: [String,Number,Object],
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
.article-container {
  .nav-title {
    font-size:24px;
    padding:0 12px;
    background:#fff;
    margin-bottom:0;
  }
  .nav-bar {
    padding-top:12px;
    .nav-btn {
      width:70px;
      height:30px;
    }
    .nav-img {
      margin-right:24px;
    }
  }
}
</style>
