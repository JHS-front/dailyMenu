<template>
  <picker
    class="selector-picker"
    :range-key="labelName"
    :range="options"
    :value="current"
    :disabled="disabled"
    @change="handleChange"
  >
    <slot />
  </picker>
</template>

<script>
export default {
  name: 'SelectorPicker',
  options: {
    styleIsolation: 'shared'
  },
  props: {
    value: {
      type: String | Number,
      required: true
    },
    disabled: Boolean,
    options: {
      type: Array,
      default: () => []
    },
    labelName: {
      type: String,
      default: 'fullName'
    },
    valueName: {
      type: String,
      default: 'enCode'
    }
  },
  computed: {
    current() {
      const { valueName, options } = this
      const current = options.findIndex(item => item[valueName] == this[valueName])
      return current > 0 ? current : 0
    },
  },
  methods: {
    handleChange(e) {
      const { valueName, options } = this
      const item = options[e.detail.value]
      const value = item[valueName]
      this.$emit('input', value)
      this.$emit('change', value, item)
    }
  }
}
</script>
