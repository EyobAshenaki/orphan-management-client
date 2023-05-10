<template>
  <section class="">
    <header class="tw-w-full tw-relative tw-bg-white tw-px-8 tw-pt-8">
      <div class="tw-flex tw-items-center tw-gap-5">
        <div></div>
        <div class="tw-flex tw-flex-col tw-gap-3">
          <div class="tw-flex tw-gap-5">
            <h1 class="tw-font-bold tw-text-2xl">
              {{ orphanFullName }}
            </h1>

            <!-- Address -->
            <div class="tw-flex tw-items-center tw-text-gray-500">
              <fa-layers class="tw-mr-2">
                <fa class="tw-w-4 tw-h-4" :icon="['fa', 'location-dot']" />
              </fa-layers>
              <span class="tw-font-medium tw-text-sm tw-mt-2">
                {{ orphanAddress }}
              </span>
            </div>
          </div>
          <div class="tw-flex tw-gap-3">
            <!-- Code -->
            <div
              class="tw-flex tw-items-center tw-text-sm tw-text-emerald-800 tw-bg-emerald-800/10 tw-border tw-border-emerald-800 tw-rounded-md tw-py-1 tw-px-3"
            >
              <fa-layers class="tw-mr-1">
                <fa class="tw-w-4 tw-h-4" :icon="['fa', 'hashtag']" />
              </fa-layers>
              <span class="tw-font-medium">
                {{ orphanCode }}
              </span>
            </div>

            <!-- Status -->
            <div
              class="tw-flex tw-items-center tw-text-sm tw-text-white tw-bg-emerald-800/70 tw-rounded-md tw-py-1 tw-px-3"
            >
              <fa-layers class="tw-mr-3">
                <!-- <fa class="tw-w-4 tw-h-4" :icon="['fa', 'hourglass-start']" /> -->
                <!-- <fa
                  class="tw-w-4 tw-h-4"
                  :icon="['fa', 'magnifying-glass-chart']"
                /> -->
                <fa
                  class="tw-w-4 tw-h-4"
                  :icon="['fa', 'square-poll-vertical']"
                />
              </fa-layers>
              <span class="tw-font-medium">
                {{ orphanStatus }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <v-spacer></v-spacer>

      <v-tabs
        v-model="tab"
        height="35"
        slider-size="3"
        class="pb-7 mt-8"
        active-class="tw-text-emerald-800"
      >
        <v-tabs-slider
          class="tw-w-[65%] tw-absolute tw-top-1/2 tw-left-1/2 tw--translate-x-1/2 tw--translate-y-1/2"
          color="tw-bg-emerald-800"
        ></v-tabs-slider>
        <v-tab
          v-for="(item, idx) in items"
          :key="idx"
          class="tw-capitalize hover:tw-text-emerald-800 hover:tw-bg-emerald-800/5 tw-rounded-[4px] tw-mx-2 tw-px-2"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    </header>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, idx) in items" :key="idx">
        <div v-if="tab === 0" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <personal-info />
        </div>

        <div v-if="tab === 1" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <education-info />
        </div>

        <div v-if="tab === 2" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <family-info />
        </div>

        <div v-if="tab === 3" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <guardian-info />
        </div>

        <div v-if="tab === 4" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <other-info />
        </div>

        <div v-if="tab === 5" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <education-info />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </section>
</template>

<script>
import PersonalInfo from '~/components/global/orphan-detail/PersonalInfo.vue'
import EducationInfo from '~/components/global/orphan-detail/EducationInfo.vue'
import FamilyInfo from '~/components/global/orphan-detail/FamilyInfo.vue'
import GuardianInfo from '~/components/global/orphan-detail/GuardianInfo.vue'
import OtherInfo from '~/components/global/orphan-detail/OtherInfo.vue'

import { orphanFullName, calculateAge } from '~/helpers/app.helpers'
export default {
  name: 'OrphanPage',
  components: {
    PersonalInfo,
    EducationInfo,
    FamilyInfo,
    GuardianInfo,
    OtherInfo,
  },
  layout: 'coordinator',
  data() {
    return {
      tab: null,
      items: [
        'Personal',
        'Education',
        'Family',
        'Guardian',
        'Other',
        'Documents',
      ],
    }
  },
  computed: {
    orphan() {
      return this.$store.getters['orphan/orphanData']
    },

    orphanFullName() {
      return orphanFullName(this.orphan)
    },

    orphanCode() {
      return this.orphan.code?.slice(1)
    },

    orphanStatus() {
      return this.orphan.currentOrphanData.sponsorshipStatus.status
    },

    orphanAddress() {
      return `${this.orphan.village.district.name}, ${this.orphan.village.name}`
    },
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      console.log(`Initialize ${this._name}`)
      this.$store.dispatch('orphan/fetchOrphanData', this.$route.params.id)
      console.log(calculateAge(this.orphan))
    },
  },
}
</script>
