<template>
  <div class="page">
    <view-box>
      <x-header slot="header" :title="$route.meta.title">
        <router-link v-if="$route.meta&&$route.meta.right" :to="$route.meta.right.url" slot="right">
          {{$route.meta.right.label}}
        </router-link>
      </x-header>
      <router-view/>
    </view-box>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {
    console.log(this.$route.meta.title)
  },
  methods: {}
}
</script>

<style lang="less">
</style>
