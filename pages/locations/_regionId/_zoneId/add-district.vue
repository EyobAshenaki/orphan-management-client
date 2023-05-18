<template>
  <v-card class="tw-max-w-xs" elevation="0">
    <v-card-title class="-tw-mb-4">New District</v-card-title>
    <v-card-text class="tw-p-5">
      <v-form ref="districtForm" @submit.prevent="saveDistrict">
        <div class="tw-flex tw-flex-col">
          <div class="form-control">
            <label class="form-label"> Region </label>
            <v-select
              v-model="regionId"
              :items="regionOptions"
              :rules="[rules.required]"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            ></v-select>
          </div>
          <div class="form-control">
            <label class="form-label"> Zone </label>
            <v-select
              v-model="zoneId"
              :items="zoneOptions"
              :rules="[rules.required]"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            ></v-select>
          </div>
          <div class="form-control">
            <label class="form-label">District Name</label>
            <v-text-field
              v-model.trim="name"
              :rules="[rules.required]"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
          <div class="tw-w-full tw-flex tw-justify-end">
            <button-dark
              :loading="loading"
              :disabled="loading"
              @click="saveDistrict"
              >Save</button-dark
            >
          </div>
        </div>
      </v-form>
      <post-save-dialog
        v-if="showPostSaveDialog"
        :show="showPostSaveDialog"
        :item-name="districtName"
        item-type="District"
        :no-route="`/locations/${$route.params.regionId}/${$route.params.zoneId}/`"
        @redoActionDeclined="showPostSaveDialog = false"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { GraphQLError } from 'graphql'
import PostSaveDialog from '~/components/global/dialogs/PostSaveDialog.vue'
import {
  createDistrict,
  fetchRegions,
  fetchZones,
} from '~/services/location.service'
export default {
  name: 'AddDistrict',
  components: {
    PostSaveDialog,
  },
  layout: 'head',
  data() {
    return {
      name: '',
      districtName: '',
      regionOptions: [
        {
          text: 'Select a region',
          value: null,
          disabled: true,
        },
      ],
      regionId: this.$route.params.regionId,
      zoneOptions: [],
      zoneId: this.$route.params.zoneId,
      loading: false,
      showPostSaveDialog: false,
      rules: {
        required: (value) => !!value || 'Required.',
      },
    }
  },
  watch: {
    regionId: async function (value) {
      this.zoneId = null
      this.zoneOptions = await this.getZoneOptions(value)
    },
  },
  mounted() {
    this.loading = true
    this.initialize()
  },
  methods: {
    async initialize() {
      try {
        this.regionOptions = [
          ...this.regionOptions,
          ...(await fetchRegions()).map((region) => {
            return {
              text: region.name,
              value: region.id,
            }
          }),
        ]
        this.zoneOptions = await this.getZoneOptions()
      } catch (error) {
        if (Array.from(error)[0] instanceof GraphQLError) {
          error.forEach((e) => {
            this.$toaster.showToast({
              content: e.message,
              state: 'error',
            })
          })
          // eslint-disable-next-line no-console
        } else console.error(error)
      } finally {
        this.loading = false
      }
    },
    async getZoneOptions(regionId) {
      const defaultOption = {
        text: 'Select a zone',
        value: null,
        disabled: true,
      }
      if (!this.regionId) return [defaultOption]
      return [
        ...this.zoneOptions,
        ...(await fetchZones(this.regionId ?? regionId)).map((zone) => {
          return {
            text: zone.name,
            value: zone.id,
          }
        }),
      ]
    },
    async saveDistrict() {
      if (!this.$refs.districtForm.validate()) return
      this.loading = true
      this.districtName = this.name
      const createDistrictInput = {
        name: this.name,
        zoneId: this.zoneId,
      }
      try {
        const data = await createDistrict(createDistrictInput)
        if (data) this.reset()
      } catch (error) {
        if (Array.from(error)[0] instanceof GraphQLError) {
          error.forEach((e) => {
            this.$toaster.showToast({
              content: e.message,
              state: 'error',
            })
          })
          // eslint-disable-next-line no-console
        } else console.error(error)
      } finally {
        this.loading = false
      }
    },
    reset() {
      this.showPostSaveDialog = true
      this.$refs.districtForm.reset()
    },
  },
}
</script>
<style scoped>
.form-control {
  @apply tw-w-full tw-flex tw-flex-col tw-gap-1;
}
.form-label {
  @apply tw-text-sm tw-text-gray-800 tw-font-light;
}
</style>
