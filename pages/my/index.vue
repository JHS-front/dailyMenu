<template>
  <view class="myContainer">
    <view class="header">
        <button style="border: 0;margin: 0;padding: 0;" plain open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
            <image :src="avatarUrl" class="headimg"></image>
        </button>
        <view class="information">
            <view class="name">早上好 Admin</view>
            <view class="number">173****1523</view>
        </view>
    </view>
    <view class="main">
        <view class="celllist" v-for="(item, index) in cellTopList" :key="index" @click="toPage(item)">
            <view class="cellLeft">
                <image :src="item.imgUrl" class="cellheadImg"></image>
                <span>{{ item.name }}</span>
            </view>
            <view class="cellright">
                <image src="@/static/tabBar/rightArrow.png" class="torightimg"></image>
            </view>
        </view>
    </view>
    <view class="footer">退出登录</view>
    <u-modal :show="show"  title="身份验证" showCancelButton="true" @confirm="confirmModal" @cancel="show = false">
        <view class="slot-content">
            <u--input placeholder="请输入真实姓名" border="surround" clearable v-model="name"></u--input>
        </view>
    </u-modal>
  </view>
</template>

<script>

export default {
  name: 'My',
  data() {
    return {
        show:false,
        name:"",
        avatarUrl:"https://profile-avatar.csdnimg.cn/dbc558b9be5e4154b3e1e9cb0792097c_m0_54340021.jpg!1",
        cellTopList: [
            {
                imgUrl: '../../static/tabBar/setting.png',
                name: '设置与隐私',
                pageUrl: '/pages/login/login-out'
            },
            {
                imgUrl: '../../static/tabBar/contact.png',
                name: '联系我们',
                pageUrl: '/pages/login/login-out'
            },
            {
                imgUrl: '../../static/tabBar/relate.png',
                name: '关于',
                pageUrl: '/pages/login/login-out'
            },
            {
                imgUrl: '../../static/tabBar/relate.png',
                name: '福利',
                pageUrl: '/pages/login/login-out'
            },
        ],
    }
  },
  methods:{
    onChooseAvatar(e) {
        console.log(e,'点击上传头像');
    },
    toPage(item) {
        if(item.name == '福利'){
            this.name = ""
            this.show = true
        }
        // uni.navigateTo({
        //     url: item.pageUrl
        // });
    },
    confirmModal(e){
        if(this.name == '何诗雅'){
            uni.showToast({
                title: '验证成功',
                icon: 'success'
            });
            this.show = false
            uni.navigateTo({
                url: '/pages/my/weal'
            });
        }else{
            uni.showToast({
                title: '验证失败',
                icon: 'error'
            });
            this.show = false
        }
    }
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
    .header{
        width: 750rpx;
        height: 478rpx;
        background: linear-gradient( 180deg, #FFFFFF 0%, #FFFFFF 38%, #F8FBFF 63%, #E5F0FE 100%);
        display: flex;
        padding: 224rpx 24rpx 66rpx 24rpx;
        box-sizing: border-box;
        .headimg{
            width: 128rpx;
            height: 128rpx;
            border-radius: 50%;
            border: 4rpx solid #FFFFFF;
        }
        .information{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 24rpx;
            height: 128rpx;
            .name{
                font-weight: 600;
                font-size: 40rpx;
                color: #000000;
            }
            .number{
                font-weight: 400;
                font-size: 30rpx;
                color: rgba(32,26,11,0.35);
            }
        }
    }
    .main{
        position: relative;
        top: -70rpx;
        display: flex;
        flex-direction: column;
        background: #FFFFFF;
        border-radius: 2px;
        margin: 0 24rpx;
        padding: 32rpx 30rpx;
        box-sizing: border-box;
        .celllist {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 auto;
            width: 100%;
            height: 99rpx;
            border-bottom: 3rpx solid #eee;
            .cellLeft {
                display: flex;
                align-items: center;
                .cellheadImg {
                    padding-right: 20rpx;
                    height: 50rpx;
                    width: 50rpx;
                }
            }
            .torightimg {
                width: 40rpx;
                height: 40rpx;
            }
        }
    }
    .footer{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #FFFFFF;
        border-radius: 2px;
        margin: 0 24rpx 24rpx 24rpx;
        padding: 32rpx 30rpx;
        box-sizing: border-box;
        margin-top: auto;
    }
}
</style>