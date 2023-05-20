<template>
  <section>
    <header class="tw-w-full tw-relative tw-bg-white tw-px-8 tw-pt-8">
      <div
        v-if="version > 1"
        class="tw-absolute tw-top-6 tw-right-6 tw-flex tw-flex-col tw-gap-3"
      >
        <button-dark to="/project/statistics">
          <fa-layers class="tw-mr-2">
            <fa :icon="['fa', 'chart-line']" />
          </fa-layers>
          <span>Statistics</span>
        </button-dark>
        <button-dark
          :to="`/locations/${$route.params.regionId}/${$route.params.zoneId}/statistics`"
        >
          <fa-layers class="tw-mr-2">
            <fa :icon="['fa', 'pen']" />
          </fa-layers>
          <span>Edit</span>
        </button-dark>
      </div>

      <h1 class="tw-font-bold tw-text-3xl mb-3">
        Project-{{ project?.number }}
      </h1>

      <v-spacer></v-spacer>

      <v-tabs
        v-model="tab"
        height="35"
        slider-size="3"
        class="pb-7 mt-7"
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
          <support-plans-table
            @onSupportPlanClick="navigateToSupportPlanPage($event)"
          />
        </div>

        <div v-if="tab === 1" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <districts-table :is-on-project="true" />
        </div>

        <div v-if="tab === 2" class="tw-bg-gray-100 tw-border-gray-100 tw-pt-5">
          <orphans-table
            :is-on-project="true"
            @onOrphanDetailClick="handleOrphanDetailClick($event)"
          />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </section>
</template>

<script>
import { GraphQLError } from 'graphql'
import SupportPlansTable from '~/components/tables/SupportPlansTable.vue'
import DistrictsTable from '~/components/tables/DistrictsTable.vue'
import OrphansTable from '~/components/tables/OrphansTable.vue'
import { fetchProject } from '~/services/project.service'
export default {
  name: 'ProjectPage',

  components: {
    SupportPlansTable,
    DistrictsTable,
    OrphansTable,
  },

  layout: 'dashboard',

  data() {
    return {
      version: 1,
      tab: null,
      loading: false,
      items: [
        'Support Plans',
        'Districts',
        'Orphans',
        // 'Documents',
      ],
      project: null,
    }
  },
  mounted() {
    this.loading = true
    this.initialize()
  },
  methods: {
    async initialize() {
      try {
        this.project = await fetchProject(this.$route.params.projectId)
      } catch (error) {
        if (Array.from(error)[0] instanceof GraphQLError) {
          error.forEach((e) => {
            this.$toaster.showToast({
              content: e.message,
              state: 'error',
            })
          })
          // eslint-disable-next-line no-console
        } else console.log(error)
      } finally {
        this.loading = false
      }
    },

    navigateToSupportPlanPage(item) {
      this.$router.push({
        name: 'projects-projectId-supportPlanId',
        params: { supportPlanId: item.id },
      })
    },

    handleOrphanDetailClick(item) {
      console.log('Go to orphan detail: ', item)
      this.$router.push({
        name: 'projects-projectId-orphanId',
        params: { orphanId: item.id },
      })
    },
  },
}
</script>
