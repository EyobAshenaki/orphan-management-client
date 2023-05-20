<template>
  <table-component
    :loading="loading"
    title="Users"
    :headers="headers"
    :items="items"
    items-key="id"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    :show-select="true"
    :single-select="true"
    @onSelectedItemChange="$emit('onUserSelected', $event)"
  >
    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
    </template>
    <template #title-button>
      <button-light
        to="/users/add-user"
        class="tw-border tw-border-emerald-600"
      >
        <span>Add User</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="['fa', 'plus']" />
        </fa-layers>
      </button-light>
    </template>
  </table-component>
</template>

<script>
import TableComponent from '~/components/global/TableComponent.vue'
export default {
  name: 'UsersTable',
  components: {
    TableComponent,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Role',
          value: 'role',
        },
        {
          text: 'Phone Number',
          value: 'phoneNumber',
        },
      ],
      searchValue: '',
      itemsPerPage: 5,
    }
  },
  methods: {
    handleSearch(value) {
      this.searchValue = value
    },
  },
}
</script>

<style lang="scss" scoped></style>
