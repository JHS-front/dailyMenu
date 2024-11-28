<template>
  <picker
    class="date-picker"
    range-key="label"
    :start="start"
    :mode="pickerMode"
    :value="pickerValue"
    :disabled="disabled"
    :range="range"
    @change="handleChange"
    @columnchange="handleColumnchange"
  >
    <slot />
  </picker>
</template>

<script>
/**
 * 安装moment插件
 * npm install moment --save-dev
 */
import moment from 'moment'

/**
 * 日期组件（基于picker组件封装）
 * @see {@link https://uniapp.dcloud.net.cn/component/picker.html uniapp详情}
 * @see {@link https://developers.weixin.qq.com/miniprogram/dev/component/picker.html 小程序详情}
 * @module DatePicker
 * @vue-prop {"time"|"date"|"dateH"|"dateHm"|"dateHms"} [mode] 选择器类型
 * @vue-prop {string} [value] 组件值(v-model)
 * @vue-prop {string} [format] 表示组件值的日期格式
 * @vue-prop {string} [start] 表示有效日期范围的开始，mode 为 date 时字符串格式为"YYYY-MM-DD"，mode 为 time 时 格式为 "hh:mm"，其余可以是 "YYYY-MM-DD HH:mm:ss"
 * @vue-prop {string} [end] 表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"(mode 为 dateH、dateHm、dateHms 有效)
 * @vue-prop {boolean} [disabled] 禁用状态
 * @vue-event {string} input 输入事件(v-model)
 * @vue-event {string} change 确认时事件
 */
export default {
  name: 'DatePicker',
  options: {
    styleIsolation: 'shared'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    },
    start: {
      type: String,
      default: '1900-01-01'
    },
    end: {
      type: String,
      default: '2100-12-31'
    },
    disabled: Boolean,
    mode: {
      type: String,
      default: 'date'
    },
  },
  data() {
    return {
      range: [],
      pickerValue: '',
    }
  },
  computed: {
    pickerMode() {
      return ['time', 'date'].includes(this.mode)
        ? this.mode
        : 'multiSelector'
    }
  },
  watch: {
    value(value) {
      if (['time', 'date'].includes(this.mode)) {
        const format = this.mode === 'date' ? 'YYYY-MM-DD' : 'HH:mm'
        this.pickerValue = value ? moment(value).format(format) : ''
      } else {
        this.initPickerValue(value)
      }
    }
  },
  methods: {
    init() {
      if (['time', 'date'].includes(this.mode)) return

      let length = 4

      switch (this.mode) {
        case 'dateHm':
          length = 5
          break
        case 'dateHms':
          length = 6
          break
      }

      this.range = Array(length).fill([])

      this.initYearColumn()
      this.initMonthColumn()
      this.initDayColumn()

      switch (this.mode) {
        case 'dateHms':
          this.initSecondColumn()
        case 'dateHm':
          this.initMinuteColumn()
        case 'dateH':
          this.initHourColumn()
      }

      this.initPickerValue()
    },
    initYearColumn() {
      const column = []
      const startYear = moment(this.start).year()
      const endYear = moment(this.end).year()
      for (let value = startYear; value <= endYear; value++) {
        column.push({ label: `${value}年`, value })
      }
      this.range[0] = column
    },
    initMonthColumn() {
      this.range[1] = Array(12).fill().map((_, value) => ({
        label: moment({ month: value }).format('MM月'),
        value
      }))
    },
    initDayColumn() {
      const column = []
      const [yearColumn, monthColumn] = this.range
      const [yearIndex, monthIndex] = this.pickerValue
      const yearRow = yearColumn[yearIndex]
      const monthRow = monthColumn[monthIndex]
      const year = yearRow ? yearRow.value : moment().year()
      const month = monthRow ? monthRow.value : moment().month()
      const daysInMonth = moment({ year, month }).daysInMonth()
      for (let value = 1; value <= daysInMonth; value++) {
        column.push({ label: moment({ day: value }).format('DD日'), value })
      }
      this.range = this.range.map((item, i) => i == 2 ? column : item)
    },
    initHourColumn() {
      this.range[3] = Array(24).fill().map((_, value) => ({
        label: moment({ hour: value }).format('HH时'),
        value
      }))
    },
    initMinuteColumn() {
      this.range[4] = Array(60).fill().map((_, value) => ({
        label: moment({ minute: value }).format('mm分'),
        value
      }))
    },
    initSecondColumn() {
      this.range[5] = Array(60).fill().map((_, value) => ({
        label: moment({ second: value }).format('ss秒'),
        value
      }))
    },
    initPickerValue(value) {
      const date = moment(value || undefined)

      let Y, M, D, H, m, s

      switch (this.mode) {
        case 'dateHms':
          s = date.second()
        case 'dateHm':
          m = date.minute()
        case 'dateH':
          Y = date.year()
          M = date.month()
          D = date.date()
          H = date.hour()
      }

      this.pickerValue = this.range.map((column, index) => {
        const i = column.findIndex(item => {
          switch (index) {
            case 0: return item.value == Y
            case 1: return item.value == M
            case 2: return item.value == D
            case 3: return item.value == H
            case 4: return item.value == m
            case 5: return item.value == s
            default: return 0
          }
        })

        return i > -1 ? i : 0
      })
    },
    handleChange(e) {
      let value = e.detail.value
      let inp = value

      if (!['time', 'date'].includes(this.mode)) {
        inp = value.map((i, column) => this.range[column][i].value)
      }

      value = value ? moment(inp).format(this.format) : ''

      this.$emit('input', value)
      this.$emit('change', value)
    },
    handleColumnchange(e) {
      const { column, value } = e.detail
      this.pickerValue[column] = value
      if ([0, 1].includes(column)) {
        this.initDayColumn()
      }
    },
  },
  created() {
    this.init()
  }
}
</script>
