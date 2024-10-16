<script>
	if (typeof window != 'undefined') {
		if (window.innerWidth > 768) {
				window.innerWidth = 768;
		}
	}
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		width: 750rpx;
		height: 100%;
		margin: 0 auto;
	}
	image {
		width: 100%;
		height: 100%;
	}
</style>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/theme.scss";
</style>
