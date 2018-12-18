<template>
  <div class="my-shop-info-2">
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
      <div class="price">￥ {{$toPrice(it.price)}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'my-shop-info-2',
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
.my-shop-info-2 {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  .my-shop-info-item {
    flex-grow: 0;
    flex-shrink: 0;
    width: calc(~"25% - 12.5px");
    margin: 10px 0 0px 10px;
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
      margin-top: 4px;
      line-height: 16px;
      font-size: 14px;
      margin-left: 2px;
    }
    .price {
      margin-left: 2px;
      line-height: 16px;
      font-size: 12px;
      color: @red;
    }
  }
}
</style>
