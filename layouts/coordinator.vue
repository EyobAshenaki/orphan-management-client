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
import { layoutGuard } from '~/helpers/auth.helper'

export default {
  name: 'CoordinatorLayout',

  components: {
    UsersLayout,
    SideBar,
  },

  data() {
    return {
      items: [
        // {
        //   icon: ['fas', 'house'],
        //   title: 'Home',
        //   to: '/dashboard',
        // },
        {
          icon: ['fas', 'diagram-project'],
          title: 'Projects',
          to: '/projects',
        },
        {
          icon: ['fas', 'hand-holding-dollar'],
          title: 'Donors',
          to: '/donors',
        },
        {
          icon: ['fas', 'people-group'],
          title: 'Social Workers',
          to: '/social-workers',
        },
        {
          icon: ['fas', 'city'],
          title: 'Districts',
          to: '/districts',
        },
      ],
    }
  },
  beforeMount() {
    layoutGuard(this, 'coordinator')
  },
}
</script>
