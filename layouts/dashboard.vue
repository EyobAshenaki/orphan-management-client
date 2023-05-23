<template>
  <v-app>
    <side-bar :items="items" />
    <users-layout>
      <nuxt />
    </users-layout>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import UsersLayout from '~/layouts/users.vue'
import SideBar from '~/components/layout/SideBar.vue'
import { layoutGuard } from '~/helpers/auth.helper'
import { sideBarItems } from '~/helpers/sidebar.helper'

export default {
  name: 'DashboardLayout',

  components: {
    UsersLayout,
    SideBar,
  },
  computed: {
    ...mapGetters({
      userRole: 'auth/userRole',
    }),
    items() {
      return sideBarItems(this.userRole)
    },
  },
  beforeMount() {
      layoutGuard(this, `${this.userRole}`)
    console.log(`dashboard layout(${this.userRole}) > items: `, this.items);
  },
}
</script>
