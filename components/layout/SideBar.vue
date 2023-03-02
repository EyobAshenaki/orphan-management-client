<template>
  <v-navigation-drawer
    class="tw-flex tw-flex-col tw-justify-between tw-px-5"
    width="280"
    fixed
    floating
    app
  >
    <div class="tw-container tw-h-full tw-flex tw-flex-col tw-justify-between">
      <div class="nav-list">
        <div
          id="logo"
          class="tw-flex tw-items-center tw-border-b-2 tw-border-gray-100 tw-py-6 tw-mb-8"
        >
          <v-avatar size="50" color="black">
            <v-icon size="20" color="white">CDA</v-icon>
          </v-avatar>
          <v-card-title class="tw-font-bold tw-text-xl">{{
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
            class="hover:tw-text-emerald-800 hover:tw-bg-teal-50"
            active-class="tw-text-emerald-800 tw-bg-teal-50 tw-border-l-4 tw-border-teal-700"
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
          to="/coordinator/settings"
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
          to="/"
          router
          exact
          :ripple="false"
          class="hover:tw-text-red-800 hover:tw-bg-red-50 tw-rounded-md"
          active-class="tw-text-red-800 tw-bg-red-50"
        >
          <v-list-item-action class="tw-mr-5">
            <fa-layers class="fa-lg">
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
      name: 'Charity Development Association',
    }
  },
}
</script>
