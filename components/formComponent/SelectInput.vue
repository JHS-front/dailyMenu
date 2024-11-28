<template>
  <view class="select-input" @click="handleClick">
    <view v-if="disabled" :class="['select-input__input base-input', align]">{{ value || placeholder }}</view>
    <input
      v-else
      disabled
      placeholder-style="color: #252B5073"
      :class="['base-input select-input__input', align]"
      :value="value"
      :placeholder="placeholder"
    >
    <icon
      v-show="clearable && value && !disabled"
      class="select-input__clear"
      type="clear"
      size="30rpx"
      color="#252B5073"
      @click.stop="$emit('input', '')"
    />
    <u-icon
      v-if="!disabled"
      class="select-input__arrow-right-icon"
      name="arrow-right"
      size="20"
    />
  </view>
</template>

<script>
export default {
  name: 'SelectInput',
  options: {
    styleIsolation: 'shared'
  },
  props: {
    value: {
      type: String | Number | null,
      required: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '-'
    },
    disabled: Boolean,
    align: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick() {
      if (this.disabled) return
      this.$emit('click', ...arguments)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-input {
  position: relative;
  display: flex;
  align-items: center;
  padding: 6px 9px;
  box-sizing: border-box;
  &__input {
    flex: 1;
  }

  &__arrow-right-icon {
    margin-left: 24rpx;
  }

  &__clear {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 48rpx;
    height: 30rpx;
    line-height: 30rpx;
    z-index: 2;
  }
}
</style>