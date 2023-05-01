<template>
  <section class="tw-flex tw-gap-2">
    <profile-card :social-worker="socialWorker" />

    <div class="tw-flex tw-flex-col tw-gap-2">
      <div class="tw-flex tw-justify-between">
        <h1>Districts</h1>
        <v-btn
          class="tw-w-fit tw-text-sm tw-lowercase hover:tw-text-emerald-800 tw-py-3 tw-px-2"
          text
          :ripple="false"
          x-small
          @click="handleDistrictsViewAll"
        >
          <span class="tw-capitalize"> View all </span>
        </v-btn>
      </div>

      <div v-for="district in districts" :key="district.id">
        <district-list :district="district" />
      </div>
    </div>

    <div class="tw-flex tw-flex-col tw-gap-2">
      <div class="tw-flex tw-justify-between">
        <h1>Villages</h1>
        <v-btn
          class="tw-w-fit tw-text-sm tw-lowercase hover:tw-text-emerald-800 tw-py-3 tw-px-2"
          text
          :ripple="false"
          x-small
          @click="handleVillagesViewAll"
        >
          <span class="tw-capitalize"> View all </span>
        </v-btn>
      </div>

      <div v-for="village in villages" :key="village.id">
        <village-list :village="village" />
      </div>
    </div>
  </section>
</template>

<script>
import ProfileCard from '~/components/coordinator/social-worker/ProfileCard.vue'
import DistrictList from '~/components/coordinator/social-worker/DistrictList.vue'
import VillageList from '~/components/coordinator/social-worker/VillageList.vue'

export default {
  name: 'SocialWorkerProfile',

  components: {
    ProfileCard,
    DistrictList,
    VillageList,
  },

  props: {
    socialWorker: {
      type: Object,
      default: null,
    },
  },

  computed: {
    villages() {
      const villages = this.socialWorker?.districts.reduce((acc, district) => {
        const villages = district.villages.map((village) => {
          return {
            ...village,
            districtName: district.name,
            noOfOrphans: village._count_orphans,
            noOfProjects: village._count_projects,
          }
        })
        return [...acc, ...villages]
      }, [])
      return villages
    },

    districts() {
      const districts = this.socialWorker?.districts.map((district) => {
        return {
          ...district,
          noOfVillages: district._count_villages,
          noOfSocialWorkers: district._count_socialWorkers,
        }
      })
      return districts
    },
  },

  methods: {
    handleDistrictsViewAll() {
      this.$router.push({
        name: 'coordinator-districts',
      })
    },

    handleVillagesViewAll() {
      this.$emit('onVillagesViewAllClick')
    },
  },
}
</script>
