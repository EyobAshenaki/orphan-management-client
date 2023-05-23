<template>
  <v-app>
    <side-bar :items="items" />
    <users-layout>
      <nuxt />
    </users-layout>
  </v-app>
</template>

<script>
import UsersLayout from '~/layouts/users.vue'
import SideBar from '~/components/layout/SideBar.vue'
import { layoutGuard } from '~/helpers/auth.helper';

export default {
  name: 'AdminLayout',

  components: {
    UsersLayout,
    SideBar,
  },

  data() {
    return {
      items: [
        {
          icon: ['fas', 'house'],
          title: 'Home',
          to: '/admin',
        },
        {
          icon: ['fas', 'user-group'],
          title: 'Users',
          to: '/users',
        },
      ],
    }
  },
  beforeMount() {
    layoutGuard(this, 'admin')
  },
}
</script>
