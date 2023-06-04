<template>
  <v-navigation-drawer
    class="tw-flex tw-flex-col tw-justify-between tw-px-5"
    width="300"
    fixed
    floating
    app
  >
    <div class="tw-container tw-h-full tw-flex tw-flex-col tw-justify-between">
      <div class="nav-list">
        <div
          id="logo"
          class="tw-flex tw-items-center tw-border-b-2 tw-border-gray-100 tw-py-6 tw-mb-8 tw-font-serif"
        >
          <v-avatar size="50" color="black">
            <v-icon size="20" color="white">CDA</v-icon>
          </v-avatar>
          <v-card-title class="tw-break-keep tw-font-bold tw-text-xl">{{
            name
          }}</v-card-title>
        </div>

        <v-list nav class="tw-flex tw-flex-col">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            :ripple="false"
            class="hover:tw-text-emerald-800 hover:tw-bg-emerald-800/10"
            active-class="tw-text-emerald-800 tw-border-l-4 tw-border-teal-700"
          >
            <v-list-item-action class="tw-mr-5">
              <fa-layers class="fa-lg">
                <fa :icon="item.icon" />
              </fa-layers>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <v-list class="tw-flex tw-flex-col tw-gap-1.5">
        <v-list-item
          v-if="false"
          to="/settings"
          router
          exact
          :ripple="false"
          class="hover:tw-text-blue-800 hover:tw-bg-blue-50 tw-rounded-md"
          active-class="tw-text-blue-800 tw-bg-blue-50 tw-border-l-4 tw-border-blue-700"
        >
          <v-list-item-action class="tw-mr-5">
            <fa-layers class="fa-lg">
              <fa :icon="['fa', 'gear']" />
            </fa-layers>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Settings </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Logout -->
        <v-list-item
          router
          exact
          :ripple="false"
          class="hover:tw-text-red-800 hover:tw-bg-red-50 tw-rounded-md"
          active-class="tw-text-red-800 tw-bg-red-50"
          @click="logout"
        >
          <v-list-item-action class="tw-mr-5">
            <fa-layers class="fa-lg fa-rotate-180">
              <fa :icon="['fa', 'arrow-right-from-bracket']" />
            </fa-layers>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Logout </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { logout } from '~/services/user.service'

export default {
  name: 'SideBar',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      name: 'Charity Development Association - OMP',
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/unsetUser')
      logout()
      this.$router.push('/')
    },
  },
}
</script>
