<template>
	<view class="body">
		<view class="head">全部分类</view>
		<view class="main">
			<u--input placeholder="输入关键词" :shape="circle" prefixIcon="search" prefixIconStyle="font-size: 22px;color: #909399"></u--input>
			<view class="mainMenu">

			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello 分类'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
.body {
	background-color: rgba(246, 247, 251, 1);
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
		}
	}
}

</style>
