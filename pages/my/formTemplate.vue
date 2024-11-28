<template>
	<view class="formTemplateBody" :scroll-y="false">
        <view class="formTemplateNav">
			<u-navbar :title="newTitle" :background="{ background: '#ebf6fe' }" back-icon-color="#000000e6"
				title-color="#000" :autoBack="true" back-icon-size="34" :border-bottom="false" />
		</view>
		<view class="basicInfo">
			<view class="basicInfoForm">
				<u-form :model="form" ref="uForm" :rules="rules" :error-type="['message']" labelWidth="180"
					:labelPosition="labelPosition" label-style="{ color: '#747F9E' }">
					<u-form-item label="姓名" :required="detailType == 'view' ? false : true" prop="name" borderBottom>
						<view class="formName" v-if="detailType == 'view'">{{ form.name }}</view>
						<u-input v-model="form.name" placeholder="请输入姓名" v-else />
					</u-form-item>
                    <u-form-item label="电话" :required="detailType == 'view' ? false : true" prop="phone" borderBottom>
						<view class="formName" v-if="detailType == 'view'">{{ form.phone }}</view>
						<u-input v-model="form.phone" placeholder="请输入电话" v-else />
					</u-form-item>
					<u-form-item label="单位" :required="detailType=='view' ? false : true" prop="unit" borderBottom>
						<view class="formName" v-if="detailType=='view'">{{ form.unit }}</view>
						<selector-picker-input @change="unitChange()" v-model="form.unit" :options="dictUnitList" v-else/>
					</u-form-item>
					<u-form-item label="日期" prop="formTime" :required="detailType == 'view' ? false : true" borderBottom>
						<view class="formName" v-if="detailType == 'view'">{{ form.formTime }}</view>
                        <date-picker-input
                            mode="dateHms"
                            format="YYYY-MM-DD HH:mm:ss"
                            :start="start"
                            @input="formTimeChange()"
                            v-model="form.formTime"
                            v-else 
                        />
					</u-form-item>
				</u-form>
			</view>
			<view class="basicInfoBottom">
				<view class="orderReportButton">
					<u-button type="primary" v-if="detailType == 'view'" @click="detailType = 'add'" color="#0052D9">编 辑</u-button>
					<u-button type="primary" v-else @click="submit" color="#0052D9">保 存</u-button>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
/**
 * 安装moment插件
 * npm install moment --save-dev
 */
import moment from 'moment'
import DatePickerInput from '@/components/formComponent/DatePickerInput.vue'
import SelectorPickerInput from '@/components/formComponent/SelectorPickerInput.vue'
// import { apiDetail, apiUpdate } from "@/api/formTemplate.js"

export default {
	components: {
        DatePickerInput,
		SelectorPickerInput,
	},
	data() {
		return {
            start: moment().format('YYYY-MM-DD'),
            options: {
				id: '',
				type: '',
			},
			form: {
				name: '',
                unit:'',
				formTime: '',
                phone: '',
			},
			rules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: ['change', 'blur'] }
				],
				formTime: [
					{ required: true, message: '请选择日期', trigger: 'change' }
				],
				unit: [
					{ required: true, message: '请选择单位', trigger: "change"  }
				],
                phone: [
					{
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
						message: '电话格式不正确',
						trigger: ['change', 'blur'],
					},
					{ required: true, message: '请输入电话', trigger: ['change', 'blur'] }
				],
			},
            newTitle:"新增表单",
			detailType: "",
			labelPosition: "",
            dictUnitList:[
				{
					fullName:"元",
					enCode:"元",
				},{
					fullName:"万元",
					enCode:"万元",
				}
			],
		}
	},
	mounted() {
		console.log(this.options.type, 'this.type')
		if (this.options.type == 'add') {
			this.newTitle = '新增表单'
			this.detailType = 'add'
			this.labelPosition = 'top'
		} else {
			this.newTitle = '查看详情'
			this.detailType = 'view'
			this.labelPosition = 'left'
		}
		this.init()
	},
	onLoad(op) {
		this.options = op
        // 从别的页面跳转过来的写法：
        // addInfo(type,id){
		// 	uni.navigateTo({
		// 		url:'/pages/formTemplate/components/addInsurance?type=' + type + '&id=' + id
		// 	})
		// },
	},
	methods: {
        unitChange(value,item){
            this.$refs.uForm.validateField('unit');
        },
        formTimeChange(e){
            this.$refs.uForm.validateField('formTime');
        },
		async init() {
			uni.showLoading({
				title: "正在获取", mask: true
			})
			if (this.options.type == 'view') {
			    await this.getDetail()
			}
            uni.hideLoading()
		},
        // 获取详情数据
		async getDetail() {
			uni.showLoading({
				title: "正在获取", mask: true
			})
			// await apiDetail({ id: this.options.id }).then(res => {
			// 	let data = res.data.data
			// 	this.form = data
				uni.hideLoading()
			// })
		},
        // 点击'保存'提交数据
		submit() {
			// uni.showLoading({
			// 	title: "正在保存", mask: true
			// })
			let obj = {
				name: this.form.name,
                phone: this.form.phone,
                unit: this.form.unit,
				formTime: this.form.formTime,
				id: this.options.type == 'view' ? this.form.id : ""
			}
            console.log('验证');
			this.$refs.uForm.validate(valid => {
				if (valid) {
                    console.log('验证通过');
					// apiUpdate({ data: obj }).then(res => {
					// 	if (res.data.code == 200) {
					// 		uni.showToast({
					// 			title: '修改成功！',
					// 			icon: "success"
					// 		})
					// 		uni.navigateBack(1)
					// 	} else {
					// 		uni.showToast({
					// 			title: res.data.msg,
					// 			icon: "error"
					// 		})
					// 	}
					// 	uni.hideLoading()
					// })
				} else {
					console.log('验证失败');
					uni.hideLoading()
				}
			});
		},
	},
    onReady() {
		this.$refs.uForm.setRules(this.rules);
	}
}
</script>

<style lang="scss" scoped>
.formTemplateBody {
	.formTemplateNav {
        height: 180rpx;
        background: linear-gradient(180deg, #EBF4FF 0%, #F6F7FB 100%), #FFFFFF;
	}

	.basicInfo {
		display: flex;
		flex-direction: column;
		height: 88vh;
		background: #F6F7FB;

		.basicInfoForm {
			padding: 32rpx 24rpx;
			max-height: 64vh;
			overflow: auto;
			margin: 0 auto;
			width: 94%;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 4rpx;
			display: flex;
			flex-direction: column;

			.title {
				font-weight: 600;
				font-size: 32rpx;
				color: #252B50;
			}

			.formName {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				color: #252B50;
				height: 76rpx;
			}
		}

		.basicInfoBottom {
			display: flex;
			flex-direction: column;
			background: #ffffff;
			margin-top: auto;
			height: 10vh;

			.orderReportButton {
				width: 90%;
				margin: 0 auto;
				margin-top: 20rpx;
			}
		}
	}
}
</style>