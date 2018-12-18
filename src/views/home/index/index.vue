<template>
  <div class="home-index">
    <my-search />
    <div class="page-title">
      <span class="title">官网推荐</span>
      <span class="descript">也许这就是你想要的</span>
    </div>
    <router-link :to="{ name: '/page/cscs'}">GGGGGGGGGGGGGGGGGGGGGGGG</router-link>
    <my-shop-info-2 :data="data"></my-shop-info-2>
    <my-shop-info-4 :data="data"></my-shop-info-4>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          src: './static/a.png',
          name: '标题一',
          descript: '描素',
          price: '123'
        },
        {
          src: './static/a.png',
          name: '标题一',
          descript: '描素',
          price: '123'
        },
        {
          src: './static/a.png',
          name: '标题一',
          descript: '描素',
          price: '123'
        },
        {
          src: './static/a.png',
          name: '标题一',
          descript: '描素',
          price: '123'
        },
        {
          src: './static/a.png',
          name: '标题一',
          descript: '描素',
          price: '123'
        },
        {
          src: './static/a.png',
          name: '标题一',
          descript: '描素',
          price: '123'
        }
      ]
    }
  },
  created () {},
  activated () {},
  deactivated () {},
  methods: {}
}
</script>
<style lang="less" scoped>
@import "../../../style/base.less";
.page-title {
  overflow: hidden;
  padding: 10px 10px 0px 10px;
  .title {
    float: left;
    font-size: 18px;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      display: inline-block;
      width:40px;
      height: 6px;
      background:@yellow;
      right:-2px;
      bottom: 4px;
      z-index:-1;
    }
  }
  .descript {
    float: right;
    font-size: 12px;
    color: @gray;
    line-height: 28px;
  }
}
</style>
