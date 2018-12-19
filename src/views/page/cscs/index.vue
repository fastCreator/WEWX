<template>
  <my-scroller @pullup="pullup" height="-56">
    <div>
      <span
        v-for="(it,i) in data"
        :key="i"
      >{{i*111111111111111}}<br /><br /><br /></span>
    </div>
  </my-scroller>
</template>
<script>
export default {
  data () {
    return {
      data: []
    }
  },
  created () {
    this.data.length = 20
  },
  activated () {},
  deactivated () {},
  methods: {
    pullup (call) {
      setTimeout(() => {
        this.data.length += 10
        this.data = JSON.parse(JSON.stringify(this.data))
        if (this.data.length > 30) {
          call(true)
        } else {
          call(false)
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
