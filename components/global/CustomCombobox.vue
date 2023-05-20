<template>
  <v-combobox
    v-model="selectedItems"
    :items="items"
    :search-input.sync="search"
    :multiple="multiple"
    :hide-selected="!multiple"
    :clearable="!readonly"
    color="teal darken-2"
    :dense="!multiple"
    filled
    outlined
    small-chips
    :readonly="readonly"
  >
    <template #no-data>
      <div class="tw-text-sm tw-text-gray-600 tw-rounded-md tw-px-2">
        No results matching "<strong class="tw-text-black">{{ search }}</strong
        >". Press <kbd class="tw-bg-gray-500">enter</kbd> to create a new one
      </div>
    </template>
    <template #selection="data">
      <v-chip
        :key="JSON.stringify(data.item)"
        v-bind="data.attrs"
        :input-value="data.selected"
        :readonly="data.disabled"
        class="combo-chip"
      >
        <v-avatar class="combo-chip-avatar" left>
          {{ data.item.slice(0, 1).toUpperCase() }}
        </v-avatar>
        {{ data.item }}
        <fa-layers
          class="tw-text-emerald-800 tw-ml-1"
          @click="readonly || data.parent.selectItem(data.item)"
        >
          <fa class="tw-w-4 tw-h-4" :icon="['fa', 'xmark']" />
        </fa-layers>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
export default {
  name: 'CustomCombobox',

  props: {
    items: {
      type: Array,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      search: '',
    }
  },

  computed: {
    selectedItems: {
      get() {
        return this.$attrs.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style scoped>
.combo-chip {
  @apply tw-text-sm tw-bg-white tw-text-emerald-800 tw-font-normal tw-border tw-border-emerald-800 tw-mb-2 tw-mr-1;
}

.combo-chip-avatar {
  @apply tw-w-5 tw-text-white tw-bg-emerald-800;
}
</style>
