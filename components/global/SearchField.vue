<template>
  <v-text-field
    v-model="searchValue"
    class="tw-max-w-xs tw-rounded-md"
    placeholder="Search"
    filled
    rounded
    dense
  >
    <template #prepend-inner>
      <fa-layers class="-tw-ml-2 tw-mr-2 tw-mt-[3px] tw-text-gray-400">
        <fa :icon="['fa', 'magnifying-glass']" />
      </fa-layers>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'SearchField',
  data() {
    return {
      searchValue: '',
    }
  },

  watch: {
    searchValue: {
      handler: function (newVal, oldVal) {
        this.$emit('onSearch', newVal)
      },
    },
  },
}
</script>
