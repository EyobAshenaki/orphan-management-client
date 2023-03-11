<template>
  <v-card class="tw-max-w-xs" elevation="0">
    <v-card-title class="tw-mb-1">New Zone</v-card-title>
    <v-card-text class="tw-p-5">
      <v-form ref="zoneForm" @submit.prevent="saveZone">
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
            <label class="form-label">Zone Name</label>
            <v-text-field
              v-model="name"
              :rules="[rules.required]"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
          <div class="tw-w-full tw-flex tw-justify-end tw-gap-6">
            <button-dark @click.prevent="saveZone">Save</button-dark>
          </div>
        </div>
      </v-form>
      <post-save-dialog
        v-if="showPostSaveDialog"
        :show="showPostSaveDialog"
        :item-name="zoneName"
        item-type="Zone"
        no-route="/head/locations"
        @redoActionDeclined="showPostSaveDialog = false"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import PostSaveDialog from '~/components/global/dialogs/PostSaveDialog.vue'
export default {
  name: 'AddZone',
  components: {
    PostSaveDialog,
  },
  layout: 'head',
  data() {
    return {
      name: '',
      zoneName: '',
      regionId: this.$store.state.location.selectedRegion.id,
      showPostSaveDialog: false,
      rules: {
        required: (value) => !!value || 'Required.',
      },
    }
  },
  computed: {
    regionOptions() {
      const regions = this.$store.state.location.regions
      return regions.map((region) => {
        return {
          text: region.name,
          value: region.id,
        }
      })
    },
  },
  methods: {
    async saveZone() {
      if (!this.$refs.zoneForm.validate()) return
      this.zoneName = this.name
      const createZoneInput = {
        name: this.name,
        regionId: this.regionId,
      }
      this.$store.commit('location/SET_ZONE_INPUT', createZoneInput)
      try {
        const error = await this.$store.dispatch('location/createZone')
        if (!error) this.reset()
      } catch (_error) {}
    },
    reset() {
      this.$store.commit('location/SET_ZONE_INPUT', {})
      this.showPostSaveDialog = true
      this.$refs.zoneForm.reset()
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
