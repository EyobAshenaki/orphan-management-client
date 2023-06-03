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
  name: 'HeadLayout',

  components: {
    UsersLayout,
    SideBar,
  },

  data() {
    return {
      items: [
        // {
        //   icon: ['fas', 'gauge'],
        //   title: 'Dashboard',
        //   to: '/dashboard',
        // },
        {
          icon: ['fas', 'diagram-project'],
          title: 'Projects',
          to: '/projects',
        },
        {
          icon: ['fas', 'map'],
          title: 'Locations',
          to: '/locations',
        },
        {
          icon: ['fas', 'hand-holding-dollar'],
          title: 'Donors',
          to: '/donors',
        },
        {
          icon: ['fas', 'people-roof'],
          title: 'Coordinators',
          to: '/coordinators',
        },
      ],
    }
  },
  beforeMount() {
    layoutGuard(this, 'head')
  },
}
</script>
