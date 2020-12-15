import Vue from 'vue'
import Vuex from 'vuex'
import { getItem,setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser(state,data) {
      state.user = data
      // 为了防止页面刷新 store 中的数据丢失 对数据进行本地持久化存储
      setItem(USER_KEY,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
