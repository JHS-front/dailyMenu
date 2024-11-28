<template>
  <selector-picker
    :options="options"
    :value="value"
    :disabled="disabled"
    :labelName="labelName"
    :valueName="valueName"
    @input="$emit('input', $event)"
    @change="handleChange"
  >
    <select-input
      :value="inputValue"
      :clearable="clearable"
      :placeholder="placeholder"
      :align="align"
      :disabled="disabled"
      @input="$emit('input', $event)"
    />
  </selector-picker>
</template>

<script>
import SelectorPicker from './SelectorPicker.vue'
import SelectInput from './SelectInput.vue'

export default {
  name: 'SelectorPickerInput',
  options: {
    styleIsolation: 'shared'
  },
  components: {
    SelectorPicker,
    SelectInput
  },
  props: {
    value: {
      type: String | Number | null,
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
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '-'
    },
    align: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputValue() {
      const item = this.options.find(item => item[this.valueName] == this.value)
      return item ? item[this.labelName] : this.value
    }
  },
  methods: {
    handleChange(value, item) {
      this.$emit('change', value, item)
    }
  }
}
</script>
