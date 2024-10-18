<template>
  <view class="myContainer">
    <!-- <video :src="videoUrl" controls style="width: 100%;"></video> -->
    <image :src="imgUrl" mode="aspectFit" alt="" class="aboutusImage">
  </view>
</template>

<script>

export default {
  name: 'weal',
  data() {
    return {
      videoUrl: 'https://vwecam.gtimg.com/1006_f0a5d88c884e490d8e38358fbd9accbb.f0.mp4?ptype=http&vkey=E4B82B446CF255E316A35051E2325CE6D88646E8C0702F70F8756B7C632C1DB2D25891AC6475CDBDA1B86E7EA4DC95A88D0D23D2289B429A&sdtfrom=v1000&owner=0&chgtype=1010&vuin=1054703944',
      imgUrl:'http://photocq.photo.store.qq.com/psc?/V12FD0Ht250yMy/OO0GOkEvd.dIewPrYqD0Dhc1zWDIz2zm6B4E*O6Am176iiEvQp*WezQkEShqvGQeCdvH2amp.VwPnyZXbtgumQ!!/b&bo=0AIABQAAAAAFB*M!&rf=viewer_4'
    }
  },
  methods:{
  },
  onShow() {
  }
}
</script>

<style lang="scss" scoped>
.myContainer{
  display: flex;
  flex-direction: column;
  background: #F6F7FB;
  height: 100vh;
	width: 100%;
  .aboutusImage{
    width: 100%;
    height: 100%; /* 使用百分比或者rpx单位 */
    display: block;
  }
}
</style>