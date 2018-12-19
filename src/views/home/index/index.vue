<template>
  <div class="home-index">
    <my-scroller @on-pullup-loading="pullup">
      <my-search />
      <swiper :list="list"></swiper>
      <div class="page-title">
        <span class="title">热门商品</span>
        <span class="descript">卖的最火的都在这</span>
      </div>
      <my-shop-info-4 :data="data"></my-shop-info-4>
      <div class="page-title br">
        <span class="title">官网推荐</span>
        <span class="descript">也许这就是你最喜爱和最想要的</span>
      </div>
      <my-shop-info-2 :data="data"></my-shop-info-2>
    </my-scroller>
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
        }
      ],
      list: [
        {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/1.jpg',
          title: '送你一朵fua'
        },
        {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/5.jpg',
          title: '送你一次旅行',
          fallbackImg: 'https://static.vux.li/demo/3.jpg'
        }
      ]
    }
  },
  created () {},
  activated () {},
  deactivated () {},
  methods: {
    pullup () { alert(1) }
  }
}
</script>
<style lang="less" scoped>
@import "../../../style/base.less";
.page-title {
  overflow: hidden;
  padding: 10px 10px 0px 10px;
  background: #fff;
  .title {
    float: left;
    font-size: 18px;
    position: relative;
    z-index: 10;
    &:after {
      content: "";
      position: absolute;
      display: inline-block;
      width: 40px;
      height: 6px;
      background: @yellow;
      right: -2px;
      bottom: 4px;
      z-index: -1;
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
