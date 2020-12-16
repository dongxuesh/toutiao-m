/**
 * 封装 dayjs
 */
import dayjs from 'dayjs'
import Vue from  'vue'

// 汉化包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// console.log(dayjs('2020-12-16 15:53:10').from(dayjs()))

dayjs.locale('zh-cn') // 全局使用

dayjs().format('YYYY-MM-DD')

// 定义一个全局过滤器
Vue.filter('relativeTime',value =>{
  return dayjs(value).from(dayjs())
})
