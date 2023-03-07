<template>
  <div class="tw-flex tw-items-center tw-gap-5 tw-pl-10">
    <span class="tw-text-gray-500">village</span>

    <fa-layers class="tw-text-gray-400">
      <fa class="tw-w-1 tw-h-1" :icon="['fa', 'circle']" />
    </fa-layers>

    <v-chip
      v-if="villageSelected"
      class="tw-mx-2"
      color="teal darken-3"
      text-color="white"
      close
      @click:close="showVillageSelect"
    >
      <div
        class="tw-w-[22px] tw-aspect-square tw-relative tw-rounded-full tw-text-emerald-800 tw-bg-white -tw-ml-1 tw-mr-2"
      >
        <fa-layers
          class="tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2"
        >
          <fa class="tw-w-[13px] tw-h-[13px]" :icon="['fa', 'tent']" />
        </fa-layers>
      </div>
      Village
    </v-chip>

    <div v-else class="tw-flex tw-items-center tw-gap-3">
      <v-select
        :items="villages"
        item-color="teal darken-3"
        color="teal darken-3"
        dense
        outlined
        class="-tw-mb-6 tw-mr-5"
      ></v-select>
      <button-dark @click="saveVillage">Save</button-dark>
      <v-btn
        class="tw-text-sm tw-capitalize tw-text-gray-500 tw-bg-gray-200 tw-ring-1 tw-ring-gray-400"
        depressed
        :ripple="false"
        @click="saveVillage"
        >Cancel</v-btn
      >
    </div>
  </div>
</template>

<script>
import ButtonDark from '~/components/global/ButtonDark.vue'

export default {
  name: 'VillageBanner',
  components: { ButtonDark },

  data() {
    return {
      villageSelected: true,
    }
  },

  computed: {
    villages() {
      return ['Village 1', 'Village 2', 'Village 3']
    },
  },

  methods: {
    showVillageSelect() {
      console.log('Show Village Select')
      this.villageSelected = false
    },

    saveVillage() {
      console.log('Save Village')
      this.villageSelected = true
    },
  },
}
</script>
