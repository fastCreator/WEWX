<template>
  <div class="my-shop-info-4">
    <div
      class="my-shop-info-item"
      v-for="(it,i) in data"
      :key="i"
    >
      <div class="img-wrap">
        <div class="img-container">
          <img
            :src="it.src"
          >
        </div>
      </div>
      <div class="name">{{it.name}}</div>
      <div class="descript">{{it.descript}}</div>
      <div class="price">￥ {{$toPrice(it.price)}}元</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'my-shop-info-4',
  props: {
    data: {
      default () {
        return []
      }
    }
  },
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
@import "../style/base.less";
.my-shop-info-4 {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  .my-shop-info-item {
    flex-grow: 0;
    flex-shrink: 0;
    width: calc(~"50% - 15px");
    margin: 10px 0 10px 10px;
    .img-wrap {
      width: 100%;
      .img-container {
        width: 100%;
        height: 0px;
        padding-bottom: 100%;
        overflow: hidden;
        margin: 0;
        position: relative;
      }
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }
    .name {
      margin-top: 8px;
      line-height: 20px;
      font-size: 16px;
      margin-left: 10px;
    }
    .descript {
      line-height: 20px;
      font-size: 12px;
      margin-left: 10px;
      color: @gray;
    }
    .price {
      margin-left: 10px;
      line-height: 20px;
      font-size: 14px;
      color: @red;
    }
  }
}
</style>
