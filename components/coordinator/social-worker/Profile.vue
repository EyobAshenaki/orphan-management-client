<template>
  <section class="tw-flex tw-gap-2">
    <profile-card />

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
          <span> View all </span>
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
          <span> View all </span>
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

  computed: {
    // socialWorker() {
    //   return this.$store.getters['socialWorker/getSocialWorker']
    // },

    villages() {
      return [
        {
          id: 1,
          name: 'village 1',
          districtName: 'district 2',
          noOfOrphans: 100,
          noOfProjects: 5,
        },
        {
          id: 2,
          name: 'village 2',
          districtName: 'district 1',
          noOfOrphans: 60,
          noOfProjects: 5,
        },
        {
          id: 3,
          name: 'village 3',
          districtName: 'district 3',
          noOfOrphans: 100,
          noOfProjects: 5,
        },
        {
          id: 4,
          name: 'village 4',
          districtName: 'district 1',
          noOfOrphans: 60,
          noOfProjects: 5,
        },
        {
          id: 5,
          name: 'village 5',
          districtName: 'district 2',
          noOfOrphans: 100,
          noOfProjects: 5,
        },
        {
          id: 6,
          name: 'village 6',
          districtName: 'district 3',
          noOfOrphans: 60,
          noOfProjects: 5,
        },
      ]
    },

    districts() {
      return [
        {
          id: 1,
          name: 'district 1',
          zoneName: 'zone 2',
          noOfVillages: 100,
          noOfSocialWorkers: 5,
        },
        {
          id: 2,
          name: 'district 2',
          zoneName: 'zone 2',
          noOfVillages: 60,
          noOfSocialWorkers: 5,
        },
        {
          id: 3,
          name: 'district 3',
          zoneName: 'zone 2',
          noOfVillages: 100,
          noOfSocialWorkers: 5,
        },
      ]
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
