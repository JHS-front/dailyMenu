<template>
  <view class="mapContainer">
    <view class="header">
        <u-form :model="form" ref="uForm" labelWidth="150" label-style="{ color: '#747F9E' }">
            <u-form-item label="坐标点搜索: " prop="address">
                <selector-picker-input v-model="form.address" :options="dictAddressList"/>
            </u-form-item>
            <u-form-item>
                <div class="bottonCon">
                    <div class="conTitle">澳门之旅</div>
                    <div class="conButton">
                        <button type="primary" @click="submit">查询</button>
                        <button @click="reset" style="margin-left: 20rpx;">重置</button>
                    </div>
                </div>
            </u-form-item>
        </u-form>
    </view>
    <view class="page-section page-section-gap">
      <!-- subkey:地图密钥 -->
      <map
        class="map-container"
        :latitude="latitude"
        :longitude="longitude"
        :scale="14"
        :subkey="process.env.VUE_APP_MAP_KEY"
        @click="onMapTap"
        @markertap="toMarkerForm"
        :markers="showMarkers"
      ></map>
    </view>
  </view>
</template>

<script>
import SelectorPickerInput from '@/components/SelectorPickerInput.vue'
export default {
    components: {
		SelectorPickerInput
	},
    data() {
        return {
            map: null,
            latitude: '22.198745',
            longitude: '113.543873',
            form:{
                address:""
            },
            dictAddressList:[
                {
                    fullName:"澳门观光塔",
                    enCode:"1"
                },{
                    fullName:"大三巴牌坊",
                    enCode:"2"
                },{
                    fullName:"丽斯摄影器材行(鸿发大厦店)",
                    enCode:"3"
                },{
                    fullName:"美心摄影器材",
                    enCode:"4"
                },{
                    fullName:"占西饼店",
                    enCode:"5"
                },{
                    fullName:"横琴口岸",
                    enCode:"6"
                },{
                    fullName:"DINO BURGER",
                    enCode:"7"
                },{
                    fullName:"安德鲁饼店及咖啡室",
                    enCode:"8"
                },{
                    fullName:"玛嘉烈(金利来大厦店)",
                    enCode:"9"
                }
            ],
            markers: [
                {
                    id: 1,
                    latitude: '22.17686',
                    longitude: '113.54184',
                    width: 22,
                    height: 30,
                    callout: {
                        content: "澳门观光塔\n地址：西湾湖广场59\n营业时间：10:00 - 22:00",
                        textAlign: 'center',
                        borderRadius: 10,
                        bgColor: '#fff',
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffsetWidth: 2,
                        shadowOffsetHeight: 2,
                        shadowBlur: 4,
                    },
                },
                {
                    id: 2,
                    latitude: '22.19456',
                    longitude: '113.54594',
                    width: 22,
                    height: 30,
                    callout: {
                        content: "大三巴牌坊\n地址：炮台山下圣保罗教堂前壁遗迹\n营业时间：全天",
                        textAlign: 'center',
                        borderRadius: 10,
                        bgColor: '#fff',
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffsetWidth: 2,
                        shadowOffsetHeight: 2,
                        shadowBlur: 4,
                    },
                },
                {
                    id: 3,
                    latitude: '22.199698', // 假设坐标
                    longitude: '113.547788', // 假设坐标
                    width: 22,
                    height: 30,
                    callout: {
                        content: "丽斯摄影器材行(鸿发大厦店)\n地址：花天堂区渡船街57-59号\n营业时间：周一至周六 10:30-20:00",
                        textAlign: 'center',
                        borderRadius: 10,
                        bgColor: '#fff',
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffsetWidth: 2,
                        shadowOffsetHeight: 2,
                        shadowBlur: 4,
                    },
                },
                {
                    id: 4,
                    latitude: '22.192355', // 假设坐标
                    longitude: '113.549588', // 假设坐标
                    width: 22,
                    height: 30,
                    callout: {
                        content: "美心摄影器材\n地址：大堂区半岛水坑尾街301-303号美心大厦\n营业时间：周一至周日 11:00-19:00",
                        textAlign: 'center',
                        borderRadius: 10,
                        bgColor: '#fff',
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffsetWidth: 2,
                        shadowOffsetHeight: 2,
                        shadowBlur: 4,
                    },
                },
                {
                    id: 5,
                    latitude: '22.185497', // 假设坐标
                    longitude: '113.547916', // 假设坐标
                    width: 22,
                    height: 30,
                    callout: {
                        content: "占西饼店\n地址：顺堂区下环风顺堂街33号丰明大厦地铺\n营业时间：周一至周日 08:00-20:00",
                        textAlign: 'center',
                        borderRadius: 10,
                        bgColor: '#fff',
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffsetWidth: 2,
                        shadowOffsetHeight: 2,
                        shadowBlur: 4,
                    },
                },
                {
                    id: 6,
                    latitude: '22.138147', // 横琴口岸坐标
                    longitude: '113.548399', // 横琴口岸坐标
                    width: 22,
                    height: 30,
                    callout: {
                        content: "横琴口岸\n地址：广东省珠海市香洲区莲花大桥西侧\n营业时间：前天",
                        textAlign: 'center',
                        borderRadius: 10,
                        bgColor: '#fff',
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffsetWidth: 2,
                        shadowOffsetHeight: 2,
                        shadowBlur: 4,
                    },
                },
                {
                    id: 7,
                    latitude: '22.153453',
                    longitude: '113.564452',
                    width: 22,
                    height: 30,
                    callout: {
                        content: "DINO BURGER\n地址：总督马路与亚利雅架圆形地交叉口西南20米\n营业时间：周一至周日 12:00-20:00",
                        textAlign: 'center',
                        borderRadius: 10,
                        bgColor: '#fff',
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffsetWidth: 2,
                        shadowOffsetHeight: 2,
                        shadowBlur: 4,
                    },
                },
                {
                    id: 8,
                    latitude: '22.144434',
                    longitude: '113.565422',
                    width: 22,
                    height: 30,
                    callout: {
                        content: "安德鲁饼店及咖啡室\n地址：大运河街870\n营业时间：装修中...",
                        textAlign: 'center',
                        borderRadius: 10,
                        bgColor: '#fff',
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffsetWidth: 2,
                        shadowOffsetHeight: 2,
                        shadowBlur: 4,
                    },
                },
                {
                    id: 9,
                    latitude: '22.195164',
                    longitude: '113.553701',
                    width: 22,
                    height: 30,
                    callout: {
                        content: "玛嘉烈(金利来大厦店)\n地址：澳门新马路马统领街金利来大厦17B地铺\n营业时间：周四至周五 08:30-16:30",
                        textAlign: 'center',
                        borderRadius: 10,
                        bgColor: '#fff',
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffsetWidth: 2,
                        shadowOffsetHeight: 2,
                        shadowBlur: 4,
                    },
                },
                // 其他标记点...
            ],
            showMarkers:[]
        };
    },
    mounted() {
        this.initMap();
    },
    methods: {
        // 地图点击事件的处理函数
        onMapTap(e) {
        //   console.log(e,'点击地图');
        },
        // 标记点击事件的处理函数
        toMarkerForm(e) {
            const markerId = e.detail.markerId;
            const marker = this.markers.find(m => m.id === markerId);
            console.log(marker,'点击标记');
            uni.openLocation({
                latitude: marker.latitude, // 纬度，范围为-90~90，负数表示南纬
                longitude: marker.longitude, // 经度，范围为-180~180，负数表示西经
                scale: 28, // 缩放比例
            })
        },
        // 初始化地图
        initMap() {
            this.showMarkers = JSON.parse(JSON.stringify(this.markers));
        },
        // 查询
        submit(){
            console.log(this.form,'form');
            
            // 使用filter方法过滤markers数组
            this.showMarkers = this.markers.filter(marker => marker.id.toString() === this.form.address);
        },
        // 重置
        reset(){
            this.form.address = ""
            this.initMap()
        }
    },
};
</script>

<style lang="scss" scoped>
.mapContainer{
    display: flex;
    flex-direction: column;
    .header{
        padding: 0 30rpx;
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 20rpx;
    }
}
.map-container {
  height: calc(100vh - 60px);
  width: 100vw;
}
.bottonCon{
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	.conTitle{
		font-weight: 600;
		font-size: 30rpx;
		color: #1E73F4;
	}
	.conButton{
		display: flex;
		align-items: center;
		justify-content: space-between;
		button{
			height: 60rpx;
			display: flex;
			align-items: center;
			margin: 0;
		}
	}
}
</style>