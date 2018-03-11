import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/index/login'
import Navigation from '@/components/index/navigation'

import LastNew from '@/components/page/lastNew'
import Recommended from '@/components/page/recommended'
import Search from '@/components/page/search'
import My from '@/components/page/my'

import PlaySongIndex from '@/components/playSong/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'首页',
      component:Login
    },
    {
      path: '/navigation',
      name: '导航条',
      component: Navigation,
      children:[
        {path:'lastNew',name:'最新',component:LastNew},
        {path:'recommended',name:'推荐',component:Recommended},
        {path:'search',name:'搜索',component:Search},
        {path:'my',name:'我的',component:My},
      ],
    },
    {
      path:'/playSongIndex',
      name: '播放音乐',
      component: PlaySongIndex,
    }
  ]
})
