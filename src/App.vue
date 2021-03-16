<template>
  <div id="app">
    <main-tab-bar/>
    
    <!--keep-alive3.0使用方式-->
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
          <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  name:'App',
  components:{
    MainTabBar
  }
}
</script>
<style>
  @import 'assets/css/base.css';
</style>
