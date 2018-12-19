<template>
  <div>
    <input width="100%" />
    <scroller
      ref="scroller"
      class="my-scroller"
      lock-x
      use-pullup
      :height="height"
      :pullup-config="pullupConfig"
      v-bind="$attrs"
      v-on="$listeners"
      @on-pullup-loading="pullup"
    >
      <slot></slot>
    </scroller>
  </div>
</template>
<script>
export default {
  name: 'my-scroller',
  props: {
    height: {
      default: '-46'
    }
  },
  data () {
    return {
      pullupConfig: {
        upContent: '',
        content: '',
        loadingContent: '',
        downContent: '',
        autoRefresh: true
      }
    }
  },
  created () {},
  methods: {
    pullup () {
      this.$vux.loading.show({
        text: ''
      })
      this.$emit('pullup', isend => {
        this.$vux.loading.hide()
        this.$nextTick(() => {
          if (isend) {
            this.$refs.scroller.disablePullup()
          } else {
            this.$refs.scroller.donePullup()
          }
        })
      })
    }
  }
}
</script>
<style lang="less">
.my-scroller {
}
</style>
