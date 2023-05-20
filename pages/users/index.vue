<template>
  <section>
    <div class="tw-flex tw-justify-evenly">
      <statistics-card v-for="item in items" :key="item.title" :item="item" />
    </div>
    <div class="px-3">
      <div class="tw-grid tw-grid-cols-3 tw-gap-6">
        <users-table
          :loading="loading"
          class="tw-my-5 tw-col-span-2"
          :items="users"
          @onUserSelected="selectUser($event)"
        />
        <profile-card v-if="isUserSelected" :user-prop="selectedUser" />
      </div>
    </div>
  </section>
</template>

<script>
import UsersTable from '~/components/tables/UsersTable.vue'
import ProfileCard from '~/components/admin/users/ProfileCard.vue'
import { fetchUsers } from '~/services/user.service'
import { fullName } from '~/helpers/app.helper'
export default {
  name: 'UsersPage',

  components: {
    UsersTable,
    ProfileCard,
  },

  layout: 'admin',

  data() {
    return {
      users: [],
      isUserSelected: false,
      selectedUser: {
        id: 'uuid',
        name: 'Khalid Fulani',
        role: 'ADMIN',
        gender: 'F',
        email: 'admin@cdaethi.org',
        phoneNumber: '0922222222',
      },
      loading: false,
    }
  },

  computed: {
    items() {
      return [
        {
          icon: ['fas', 'user-group'],
          title: 'Total Users',
          value: this.users.length,
        },
        {
          icon: ['fas', 'user-tie'],
          title: 'One Department Head',
          value: this.users.filter((user) => user.userRole === 'HEAD').length,
        },
        {
          icon: ['fas', 'city'],
          title: 'Total Donors',
          value: this.users.filter((user) => user.userRole === 'DONOR').length,
        },
        {
          icon: ['fas', 'tents'],
          title: 'Total Social Workers ',
          value: this.users.filter((user) => user.userRole === 'SOCIAL_WORKER')
            .length,
        },
        {
          icon: ['fas', 'list-check'],
          title: 'Total Coordinators',
          value: this.users.filter((user) => user.userRole === 'COORDINATOR')
            .length,
        },
      ]
    },
  },
  watch: {
    selectedUser(value) {
      if (!value) {
        this.isUserSelected = false
      }
    },
  },
  mounted() {
    this.initialize()
  },
  methods: {
    selectUser(user) {
      this.isUserSelected = true
      this.selectedUser = user
    },
    async initialize() {
      this.loading = true
      const role = (roleEnum) => {
        if (roleEnum === 'ADMIN') return 'Admin'
        if (roleEnum === 'HEAD') return 'Department head'
        if (roleEnum === 'COORDINATOR') return 'Coordinator'
        if (roleEnum === 'SOCIAL_WORKER') return 'Social worker'
        if (roleEnum === 'DONOR') return 'Donor'
      }
      try {
        this.users = (await fetchUsers()).map((user) => ({
          ...user,
          name: fullName(user.personalInfo),
          role: role(user.role),
          userRole: user.role,
          personalInfo: {
            ...user.personalInfo,
          },
          phoneNumber: user.personalInfo.phoneNumber ?? 'N/A',
        }))
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
