<template>
  <div class="my-container">
    <!--登录状态的头部-->
    <van-cell-group v-if='user' class='my-info'>
      <van-cell center class='base-info' :border='false'>
        <van-image
        class='head-img'
        slot='icon'
        round
        fit='cover'
        :src= 'currentUser.photo'
         />
        <div class='name' slot='title'>{{currentUser.name}}</div>
        <van-button class='update-btn' size='mini' round>编辑资料</van-button>
      </van-cell>
      <van-grid :border='false' class='data-info'>
        <van-grid-item class='data-info-item'>
          <div slot='text'>
            <div class='count'>{{currentUser.art_count}}</div>
            <div class='txt'>头条</div>
          </div>
        </van-grid-item>
        <van-grid-item  class='data-info-item'>
          <div slot='text'>
            <div class='count'>{{currentUser.follow_count}}</div>
            <div class='txt'>关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class='data-info-item'>
          <div slot='text'>
            <div class='count'>{{currentUser.fans_count}}</div>
            <div class='txt'>粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class='data-info-item'>
          <div slot='text'>
            <div class='count'>{{currentUser.like_count}}</div>
            <div class='txt'>点赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!--未登录状态头部-->
    <div v-else class='not-login'>
      <div class='not-login-banner' @click="$router.push('/login')">
        <img src='./photo02.jpg' />
      </div>
      <div class='not-login-txt'>登录 / 注册</div>
    </div>
    <van-grid :column-num="2" class='nav-grid'>
      <van-grid-item
      class='nav-grid-item'
      icon="star-o"
      text="收藏" />
      <van-grid-item class="iconfont nav-grid-item"
      icon-prefix='icon'
      icon="suo" text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link to=''/>
    <van-cell title="小智同学" is-link to=''/>
    <van-cell title="退出登录"
      v-if='user'
      style='text-align: center;color:#d86262;'
      @click='onLogin'/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      currentUser: {}
    }
  },
 computed: {
   ...mapState(['user'])
 },
 watch: {},
 created () {
   this.getUserInfo()
 },
 mounted () {},
 methods: {
   onLogin() {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '确定退出登录吗？',
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser',null)
        })
        .catch(() => {
          // on cancel
        });
   },
   async getUserInfo() {
     const { data:res } = await getCurrentUser();
     console.log('res 信息',res)
     if(res && res.data) {
       this.currentUser = res.data
     }
   }
 }
}
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    background: url('./photo01.jpg') no-repeat;
    background-size:cover;
    .base-info {
      background: unset;
      height: 115px;
      box-sizing: border-box;
      padding-top:38px;
      padding-bottom:11px;
      .head-img {
        width: 66px;
        height: 66px;
        box-sizing: border-box;
        border: 1px solid #fff;
        margin-right:11px;
      }
      .name {
        color:#fff;
        font-size:15px;
      }
      .update-btn {
        height:16px;
        font-size:10px;
        color:#666;
      }
    }
    .data-info {
      height: 65px;
      .data-info-item {
        height:65px;
        color:#fff;
        text-align: center;
        .count {
          font-size:18px;
        }
        .txt {
          font-size:11px;
        }
      }
    }
    /deep/.van-grid-item__content {
      background: unset;
    }
  }
  .not-login {
    height: 180px;
    background:cadetblue;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .not-login-banner {
      img {
        width:100px;
        height:100px;
        border-radius:50%;
      }
    }
    .not-login-txt {
      font-size:18px;
    }
  }
  .nav-grid {
    .nav-grid-item {
      height: 75px;
    }
  }
}
</style>
