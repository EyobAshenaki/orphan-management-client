<template>
  <v-card class="tw-max-w-xs" elevation="0">
    <v-card-title class="-tw-mb-4">New District</v-card-title>
    <v-card-text class="tw-p-5">
      <v-form ref="villageForm" @submit.prevent="saveDistrict">
        <div class="tw-flex tw-flex-col">
          <div class="form-control">
            <label class="form-label"> Region </label>
            <v-select
              v-model="regionZones"
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
              v-model="zoneDistricts"
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
            <label class="form-label"> District </label>
            <v-select
              v-model="districtId"
              :items="districtOptions"
              :rules="[rules.required]"
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
        no-route="/head/locations"
        @redoActionDeclined="showPostSaveDialog = false"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import PostSaveDialog from '~/components/global/dialogs/PostSaveDialog.vue'
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
      regionZones: this.$store.state.location.selectedRegion.zones,
      zoneDistricts: this.$store.state.location.selectedZone.districts,
      districtId: this.$store.state.location.selectedDistrict.id,
      showPostSaveDialog: false,
      rules: {
        required: (value) => !!value || 'Required.',
      },
      zoneOptions: this.getZones(),
      districtOptions: this.getDistricts(),
    }
  },
  computed: {
    regionOptions() {
      return this.$store.state.location.regions.map((region) => {
        return {
          text: region.name,
          value: region.zones,
        }
      })
    },
  },
  watch: {
    regionZones: function (value) {
      this.districtId = null
      const defaultOption = {
        text: 'Select a zone',
        value: null,
      }
      this.districtOptions = [defaultOption]
      this.zoneOptions = value.map((zone) => {
        return {
          text: zone.name,
          value: zone.districts,
        }
      })
    },
    zoneDistricts: function (value) {
      this.districtId = null
      this.districtOptions = value.map((district) => {
        return {
          text: district.name,
          value: district.id,
        }
      })
    },
  },
  methods: {
    getZones() {
      const defaultOption = {
        text: 'Select a zone',
        value: null,
      }
      if (!this.$store.state.location.selectedRegion?.zones)
        return [defaultOption]
      return Array.from(this.$store.state.location.selectedRegion.zones).map(
        (zone) => {
          return {
            text: zone.name,
            value: zone.districts,
          }
        }
      )
    },
    getDistricts() {
      const defaultOption = {
        text: 'Select a district',
        value: null,
      }
      if (!this.$store.state.location.selectedZone?.districts)
        return [defaultOption]
      return Array.from(this.$store.state.location.selectedZone.districts).map(
        (district) => {
          return {
            text: district.name,
            value: district.id,
          }
        }
      )
    },
    async saveVillage() {
      if (!this.$refs.villageForm.validate()) return
      this.villageName = this.name
      const createVillageInput = {
        name: this.name,
        districtId: this.districtId,
      }
      this.$store.commit('location/SET_VILLAGE_INPUT', createVillageInput)
      try {
        const error = await this.$store.dispatch('location/createVillage')
        if (!error) this.reset()
      } catch (_error) {}
    },
    reset() {
      this.$store.commit('location/SET_VILLAGE_INPUT', {})
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
