<template>
  <search class="my-search" v-bind="$attrs" v-on="$listeners"></search>
</template>
<script>
export default {
  name: 'my-search',
  data () {
    return {}
  },
  created () {},
  methods: {
    onFocus () {
      return false
    }
  }
}
</script>
<style lang="less">
.my-search{
}
</style>
