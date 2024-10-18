<template>
	<view class="body">
		<view class="head">全部分类</view>
		<view class="main">
			<u--input placeholder="输入关键词" v-model="keyword" @input="handleInput" :shape="circle" prefixIcon="search" prefixIconStyle="font-size: 22px;color: #909399"></u--input>
			<view class="mainMenu">
				<view class="left">
					<view class="leftFor" v-for="(item,index) in classifyList" :key="index" @click="selectItem(item,index)" :class="{ selected: selectedIndex === index }">
						<view class="leftItem">{{ item.name }}</view>
					</view>
				</view>
				<view class="right">
					<view class="rightFor" v-for="(item,index) in filterMainList" :key="index">
						<view class="rightItem">
							<image :src="item.imgUrl" class="cellheadImg"></image>
                			<view class="cellText">
								<view class="cellheadText">{{ item.headText }}</view>
								<view class="cellsubText">
									<span class="overflow-eps">原料：{{ item.subText }}</span>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import { foodLists } from '../../utils/foodMock.js'; // mock数据
	export default {
		data() {
			return {
				classifyList:[
					{
						id:"1",
						name:"蔬菜类",
						imgUrl:"../../static/index/vegetable.png",
					},{
						id:"2",
						name:"汤类",
						imgUrl:"../../static/index/soup.png",
					},{
						id:"3",
						name:"鱼类",
						imgUrl:"../../static/index/fish.png",
					},{
						id:"4",
						name:"肉类",
						imgUrl:"../../static/index/meat.png",
					},{
						id:"5",
						name:"海鲜类",
						imgUrl:"../../static/index/seafood.png",
					},{
						id:"6",
						name:"主食类",
						imgUrl:"../../static/index/food.png",
					},{
						id:"7",
						name:"甜品类",
						imgUrl:"../../static/index/dessert.png",
					},{
						id:"8",
						name:"豆制品类",
						imgUrl:"../../static/index/bean.png",
					}
				],
				keyword:"",
				mainList:[],
				filterMainList:[],
				selectedIndex:null
			}
		},
		computed: {

		},
		onLoad() {
			console.log(foodLists,'foodLists');
			this.keyword = ""
			this.selectedIndex = 0; // 默认选中第一个
			this.mainList = foodLists.filter(filterItem => filterItem.type === this.classifyList[0].name); // 默认显示第一个分类的数据
			this.filterMainList = foodLists.filter(filterItem => filterItem.type === this.classifyList[0].name);
		},
		methods: {
			handleInput(e) {
				this.filterMainList = this.mainList.filter(item => {
					// 这里使用了toLowerCase来忽略大小写的差异
					return item.headText.toLowerCase().includes(this.keyword.toLowerCase());
				});
			},
			selectItem(item,index) {
				this.selectedIndex = index; // 更新选中的 index
				// 使用 filter 方法筛选 foodLists
				this.mainList = foodLists.filter(filterItem => filterItem.type === item.name);
				this.filterMainList = foodLists.filter(filterItem => filterItem.type === item.name);
				this.keyword = ""
			},

		}
	}
</script>

<style lang="scss" scoped>
.body {
	background-color: #ffffff;
	height: 100vh;
	width: 100%;
	.head{        
		height: 180rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 70rpx;
		box-sizing: border-box;
		font-size: 40rpx;
		background: #0052d9;
		color: #FFFFFF;
	}
	.main{
		display: flex;
		flex-direction: column;
		width: 100%;
		::v-deep .u-input__content{
			height: 64rpx;
			background: #F1F2F4;
			border-radius: 36rpx;
			padding: 0 30rpx;
		}
		.mainMenu{
			margin-top: 20rpx;
			display: flex;
			.left{
				display: flex;
				flex-direction: column;
				width: 20%;
				height: 60vh;
    			background: #F1F2F4;
				.leftFor{
					display: flex;
					flex-direction: column;
					height: 96rpx;
					justify-content: center;
					box-sizing: border-box;
					.leftItem{
						padding-left: 26rpx;
						box-sizing: border-box;
						font-weight: 400;
						font-size: 28rpx;
						color: rgba(36,38,41,0.65);
					}
				}
				.leftFor.selected {
					background-color: #FFFFFF;
					.leftItem{
						padding-left: 23rpx;
						border-left: 3px solid #0052d9;
						font-weight: 600;
						color: #0052d9;
					}
				}
			}
			.right{
				background: #FFFFFF;
				padding: 0 20rpx;
				box-sizing: border-box;
				flex: 1;
				height: 80vh;
    			overflow: auto;
				.rightFor{
					display: flex;
					flex-direction: column;
					height: 200rpx;
					justify-content: center;
					margin-bottom: 20rpx;
					background: #F1F2F4;
    				border-radius: 16rpx;
					.rightItem{
						display: flex;
						align-items: center;
						.cellheadImg{
							margin-right: 20rpx;
							width: 36%;
							height: 200rpx;
						}
						.cellText{
							flex: 1;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							height: 100%;
							padding: 20rpx 0;
							box-sizing: border-box;
							.cellheadText{
								font-weight: 600;
								font-size: 30rpx;
								color: #242629;
							}
							.cellsubText{
								font-weight: 500;
								font-size: 24rpx;
								color: rgba(36,38,41,0.45);
								.overflow-eps{
									overflow: hidden;
    								text-overflow: ellipsis;
									display:-webkit-box;
									-webkit-line-clamp: 2; /*第几行裁剪*/
									-webkit-box-orient:vertical;
								}
							}
						}

					}
				}
			}
		}
	}
}

</style>
