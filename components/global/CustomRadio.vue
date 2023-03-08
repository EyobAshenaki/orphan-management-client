<template>
  <div class="radio-control">
    <v-radio
      :label="label"
      color="teal darken-2"
      :ripple="false"
      :value="value"
    ></v-radio>
  </div>
</template>

<script>
export default {
  name: 'CustomRadio',

  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.radio-control {
  @apply tw-min-w-[11rem] tw-w-fit tw-max-w-xs tw-text-black tw-border-2 tw-border-gray-300 tw-bg-white tw-rounded-lg tw-py-3 tw-px-5 tw-mr-5 tw-mb-2;
}
</style>
