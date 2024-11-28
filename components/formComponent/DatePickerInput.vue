<template>
  <date-picker
    :value="value"
    :disabled="disabled"
    :mode="mode"
    :start="start"
    :end="end"
    :format="format"
    @input="$emit('input', $event)"
  >
    <select-input
      :value="value"
      :clearable="clearable"
      :placeholder="placeholder"
      :align="align"
      :disabled="disabled"
      @input="$emit('input', $event)"
    />
  </date-picker>
</template>

<script>
import DatePicker from './DatePicker.vue'
import SelectInput from './SelectInput.vue'

export default {
  name: 'SelectorPickerInput',
  components: {
    DatePicker,
    SelectInput
  },
  props: {
    value: {
      type: String | Number,
      required: true
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
    },
    mode: {
      type: String,
      default: 'date'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    },
  },
}
</script>
