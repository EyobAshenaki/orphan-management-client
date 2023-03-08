<template>
  <section>
    <div class="tw-flex tw-justify-evenly">
      <statistics-card v-for="item in items" :key="item.title" :item="item" />
    </div>
    <div class="px-3">
      <div class="tw-grid tw-grid-cols-3 tw-gap-6">
        <users-table
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
    }
  },

  computed: {
    // todo: get this from the backend
    items() {
      return [
        {
          icon: ['fas', 'user-group'],
          title: 'Total Users',
          value: 57,
        },
        {
          icon: ['fas', 'user-tie'],
          title: 'One Department Head',
          value: 1,
        },
        {
          icon: ['fas', 'city'],
          title: 'Total Donors',
          value: 6,
        },
        {
          icon: ['fas', 'tents'],
          title: 'Total Social Workers ',
          value: 30,
        },
        {
          icon: ['fas', 'list-check'],
          title: 'Total Coordinators',
          value: 12,
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
  created() {
    this.$store.dispatch('user/fetchUsers')
    const role = (roleEnum) => {
      if (roleEnum === 'ADMIN') return 'Admin'
      if (roleEnum === 'HEAD') return 'Department head'
      if (roleEnum === 'COORDINATOR') return 'Coordinator'
      if (roleEnum === 'SOCIAL_WORKER') return 'Social worker'
      if (roleEnum === 'DONOR') return 'Donor'
    }
    this.$store.state.user.users.forEach((user) => {
      this.users.push({
        ...user,
        name: this.fullName(user),
        role: role(user.role),
        personalInfo: {
          ...user.personalInfo,
          phoneNumber: user.personalInfo.phoneNumber ?? 'N/A',
        },
      })
    })
  },
  methods: {
    fullName(user) {
      return `${user.personalInfo.firstName} ${user.personalInfo.middleName} ${user.personalInfo.lastName}`
    },
    selectUser(user) {
      this.isUserSelected = true
      this.selectedUser = user
    },
  },
}
</script>
