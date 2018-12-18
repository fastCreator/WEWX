<template>
  <div class="home">
    <view-box>
      <router-view/>
      <tabbar slot="bottom" fixed v-model="selected">
        <tabbar-item v-for="(it ,i) in navs" :key="i">
          <img slot="icon" :src="`./static/nav${it.name+(selected===it.name?'_fill':'')}.png`">
          <template slot="label">{{it.meta.title}}</template>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>
<script>
import nav from '../nav'
export default {
  data () {
    return {
      navs: nav[0].children,
      selected: 0
    }
  },
  watch: {
    selected (v) {
      this.$router.replace(`${this.navs[v].name}`)
    }
  },
  created () {
    console.log(this)
  },
  methods: {}
}
</script>
<style lang="less">

</style>
