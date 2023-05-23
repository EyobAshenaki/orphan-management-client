<template>
  <v-card class="tw-max-w-xs" elevation="0">
    <v-card-title class="-tw-mb-4">New District</v-card-title>
    <v-card-text class="tw-p-5">
      <v-form ref="villageForm" @submit.prevent="saveDistrict">
        <div class="tw-flex tw-flex-col">
          <div class="form-control">
            <label class="form-label"> Region </label>
            <v-select
              v-model="regionId"
              :items="regionOptions"
              :rules="[rules.required]"
              placeholder="Select a region"
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
              placeholder="Select a zone"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            ></v-select>
          </div>
          <div class="form-control">
            <label class="form-label"> District </label>
            <v-select
              v-model="districtId"
              :items="districtOptions"
              :rules="[rules.required]"
              placeholder="Select a district"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            ></v-select>
          </div>
          <div class="form-control">
            <label class="form-label">Village Name</label>
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
            <button-dark @click="saveVillage">Save</button-dark>
          </div>
        </div>
      </v-form>
      <post-save-dialog
        v-if="showPostSaveDialog"
        :show="showPostSaveDialog"
        :item-name="villageName"
        item-type="Village"
        :no-route="`/locations/${$route.params.regionId}/${$route.params.zoneId}/${$route.params.districtId}`"
        @redoActionDeclined="showPostSaveDialog = false"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import PostSaveDialog from '~/components/global/dialogs/PostSaveDialog.vue'
import {
createVillage,
  fetchDistricts,
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
      villageName: '',
      regionId: this.$route.params.regionId,
      regionOptions: [],
      zoneId: this.$route.params.zoneId,
      zoneOptions: [],
      districtId: this.$route.params.districtId,
      districtOptions: [],
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
    zoneId: async function (value) {
      this.districtId = null
      this.districtOptions = await this.getDistrictOptions(value)
    },
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
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
      this.districtOptions = await this.getDistrictOptions()
    },
    async getZoneOptions(regionId) {
      if (regionId === null) return []
      if (!this.regionId) return []
      return [
        ...(await fetchZones(this.regionId ?? regionId)).map((zone) => {
          return {
            text: zone.name,
            value: zone.id,
          }
        }),
      ]
    },
    async getDistrictOptions(zoneId) {
      if (zoneId === null) return []
      if (!this.zoneId) return []
      return [
        ...(await fetchDistricts(this.zoneId ?? zoneId)).map((district) => {
          return {
            text: district.name,
            value: district.id,
          }
        }),
      ]
    },
    async saveVillage() {
      if (!this.$refs.villageForm.validate()) return
      this.villageName = this.name
      const createVillageInput = {
        name: this.name,
        districtId: this.districtId,
      }
      try {
        const data = await createVillage(createVillageInput)
        if (data) this.reset()
      } catch (_error) {}
    },
    reset() {
      this.showPostSaveDialog = true
      this.$refs.villageForm.reset()
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
