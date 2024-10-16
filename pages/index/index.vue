<template>
	<view class="indexContainer">
		<image src="../../static/index/header.png"></image>
		<view class="header">
			<view class="title">美食记忆库</view>
			<view class="swiperView">
				<u-swiper height="200" :list="swiperList" indicator indicatorMode="line" circular></u-swiper>
			</view>
			<u-notice-bar :text="noticeText" bgColor="" color="#252B50"></u-notice-bar>
		</view>
		<view class="main">
			<view class="classify">
				<view class="classifyCon" v-for="(item,index) in classifyList" :key="index">
					<view class="classifyItem">
						<image :src="item.imgUrl" class="cellheadImg"></image>
						<view class="name">{{ item.name }}</view>
					</view>
				</view>
			</view>
			<view class="curve">
				
			</view>
		</view>
  	</view>
</template>
<script>
	export default {
		data() {
			return {
				swiperList: [
                    'https://tse2-mm.cn.bing.net/th/id/OIF-C.6pNNBCuaOFeMVGd363gTrg?w=273&h=182&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                    'https://preview.qiantucdn.com/58pic/20231221/00958PICaf58PICp4qaUKspKh_PIC2018_PIC2018.jpg!w1024_new_small_1',
					'https://img.shetu66.com/2022/11/20/1668955305561569.jpg',
					'https://img.shetu66.com/2022/11/20/1668959771657288.jpg',
					'https://cdn.pixabay.com/photo/2022/06/07/20/52/curry-7249247_1280.jpg',
					'https://tse2-mm.cn.bing.net/th/id/OIP-C.01ONnRJ43OO67gXJEu9B4wHaE8?w=277&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                ],
				noticeText: '[健康饮食] 为了满足大家对健康饮食的追求，我们的小程序特别推出了低脂低卡菜谱系列，让你吃得健康，吃得满足。',
				classifyList:[
					{
						name:"蔬菜类",
						imgUrl:"../../static/index/vegetable.png",
					},{
						name:"汤类",
						imgUrl:"../../static/index/soup.png",
					},{
						name:"鱼类",
						imgUrl:"../../static/index/fish.png",
					},{
						name:"肉类",
						imgUrl:"../../static/index/meat.png",
					},{
						name:"海鲜类",
						imgUrl:"../../static/index/seafood.png",
					},{
						name:"主食类",
						imgUrl:"../../static/index/food.png",
					},{
						name:"甜品类",
						imgUrl:"../../static/index/dessert.png",
					},{
						name:"豆制品类",
						imgUrl:"../../static/index/bean.png",
					}
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
.indexContainer{
	display: flex;
    flex-direction: column;
    background: #F5F5F4;
    height: 100vh;
	width: 100%;
	.header{
		position: relative;
		top: -420rpx;
		display: flex;
		flex-direction: column;
		// background: linear-gradient( 360deg, #6FB1FC 0%, #4364F7 50%, #0052D4 100%);
		padding-bottom: 20rpx;
		padding: 0 30rpx;
		.title{
			height: 200rpx;
			padding-top: 100rpx;
			box-sizing: border-box;
			font-weight: 400;
			font-size: 48rpx;
			color: #FFFFFF;
			margin-bottom: 20rpx;
		}
	}
	.main{
		position: relative;
		top: -420rpx;
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;
		margin-top: 20rpx;
		.classify{
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			.classifyCon{
				display: flex;
				width: 23%;
				.classifyItem{
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 100%;
					margin-bottom: 30rpx;
					.name{
						font-weight: 400;
						font-size: 26rpx;
						color: #252B50;
					}
					.cellheadImg{
						height: 100rpx;
						width: 100rpx;
					}
				}
			}
			.classifyCon:not(:nth-child(4n)) {
				margin-right: calc(4% / 3);
			}
		}
	}
}
</style>
