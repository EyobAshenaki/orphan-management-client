<template>
  <v-data-table
    :headers="headers"
    :loading="loading"
    :items="items"
    :item-key="itemsKey"
    :items-per-page="itemsPerPage"
    :search="search"
    :footer-props="{
      itemsPerPageOptions: [5, 10, 15, 20],
    }"
    :single-select="singleSelect"
    :show-select="showSelect"
    checkbox-color="teal darken-1"
    class="hover:tw-cursor-pointer px-6"
    @dblclick:row="handleDoubleClickRow"
    @update:items-per-page="handleItemsPerPage"
    @item-selected="handleSelectedItemChange"
  >
    <template #progress>
      <v-progress-linear
        background-color="teal lighten-3"
        color="teal darken-2"
        :active="loading"
        :indeterminate="loading"
      ></v-progress-linear>
    </template>
    <template #top>
      <div class="tw-w-full tw-flex tw-justify-between tw-py-5 tw-px-2">
        <header>
          <h1 class="tw-font-medium tw-text-2xl mb-2">{{ title }}</h1>

          <slot name="title-button"></slot>
        </header>

        <slot name="top-right"></slot>
      </div>
    </template>
    <slot />

    <template #no-data>
      <slot name="no-data"></slot>
    </template>
    <template v-for="header in headers" #[`item.${header.value}`]="{ item }">
      <slot :name="header.value" :item="item">
        {{ item[header.value] }}
      </slot>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'TableComponent',

  props: {
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    search: {
      type: String,
      default: '',
    },
    itemsKey: {
      type: String,
      default: '',
    },
    itemsPerPage: {
      type: Number,
      default: 5,
    },
    singleSelect: {
      type: Boolean,
      default: false,
    },
    showSelect: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleDoubleClickRow(_, { item }) {
      this.$emit('onDoubleClickRow', item)
    },
    handleItemsPerPage(value) {
      this.$emit('onItemsPerPage', value)
    },
    handleSelectedItemChange({ item, value }) {
      if (value) this.$emit('onSelectedItemChange', item)
    },
  },
}
</script>
