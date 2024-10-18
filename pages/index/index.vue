<template>
	<view class="indexContainer">
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
				<div class="title">
					<div class="left">价格走势</div>
					<div class="right">{{ formattedDate }} 更新</div>
				</div>
				<qiun-data-charts
					type="line"
					:opts="lineopts"
					inScrollView="true"
					:errorShow="false"
					:errorReload="false"
					:canvas2d="true"
					:ontouch="true"
					:chartData="linechartData"
				/>
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
				],
				formattedDate:"",
				lineopts: {
					color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
					padding: [15,10,0,10],
					enableScroll: true,
					legend: {},
					xAxis: {
						disableGrid: true,
						scrollShow: true,
						itemCount: 4
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2
					},
					extra: {
						line: {
							type: "straight",
							width: 2,
							activeType: "hollow"
						}
					}
				},
				linechartData:{}
			}
		},
		onLoad() {
			this.formattedDate = this.formatDate(new Date());
			this.getServerData()
		},
		methods: {
			formatDate(date) {
				const year = date.getFullYear();
				const month = ('0' + (date.getMonth() + 1)).slice(-2);
				const day = ('0' + date.getDate()).slice(-2);
				return `${year}-${month}-${day}`;
			},
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						"categories": ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06", "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12"],
						"series": [
							{
								"name": "蔬菜类",
								"data": [100, 95, 90, 105, 90, 120, 115, 110, 100, 130, 125, 110]
							},
							{
								"name": "鱼类",
								"data": [130, 105, 95, 115, 100, 130, 120, 115, 125, 140, 135, 120]
							},
							{
								"name": "肉类",
								"data": [110, 115, 110, 95, 120, 130, 125, 135, 145, 150, 140, 130]
							},
							{
								"name": "海鲜类",
								"data": [150, 140, 120, 130, 140, 130, 125, 140, 135, 150, 160, 145]
							},
						]
					};
					this.linechartData = JSON.parse(JSON.stringify(res));
				}, 500);
			}
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
	background-image: url('../../static/index/header.png');
    background-repeat: no-repeat;
    background-size: contain;
	.header{
		display: flex;
		flex-direction: column;
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
		.curve{
			background: #FFFFFF;
			border-radius: 16rpx 16rpx 16rpx 16rpx;
			padding: 24rpx 20rpx;
			.title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left{
					font-weight: 600;
					font-size: 28rpx;
					color: #313131;
				}
				.right{
					font-weight: 400;
					font-size: 24rpx;
					color: #979797;
				}
			}
		}
	}
}
</style>
