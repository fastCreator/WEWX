<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
html,body,#app,#app>.home,#app>.page{
  width:100%;
  height:100%;
  overflow: hidden;
}
</style>
