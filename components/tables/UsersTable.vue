<template>
  <table-component
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
      <button-light to="/admin/users/add-user" class="tw-border tw-border-emerald-600">
        <span>Add User</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="['fa', 'plus']" />
        </fa-layers>
      </button-light>
    </template>
    <template #no-data>
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full"
      >
        <div class="tw-text-2xl tw-font-bold tw-text-gray-500">No data</div>
        <div class="tw-text-gray-500">No data to display</div>
      </div>
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
        }, {
          text: 'Phone Number',
          value: 'personalInfo.phoneNumber'
        }
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
