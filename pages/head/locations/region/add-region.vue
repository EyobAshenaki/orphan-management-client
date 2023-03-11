<template>
  <v-card class="tw-max-w-xs" elevation="0">
    <v-card-title class="-tw-mb-4">New Region</v-card-title>
    <v-card-text class="tw-p-5">
      <v-form ref="regionForm" @submit.prevent="saveRegion">
        <div class="tw-flex tw-flex-col">
          <div class="form-control">
            <label class="form-label">Region Name</label>
            <v-text-field
              v-model="name"
              :rules="[rules.required]"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
          <div class="tw-w-full tw-flex tw-justify-end">
            <button-dark @click="saveRegion">Save</button-dark>
          </div>
        </div>
      </v-form>
      <post-save-dialog
        v-if="showPostSaveDialog"
        :show="showPostSaveDialog"
        :item-name="regionName"
        item-type="Region"
        no-route="/head/locations"
        @redoActionDeclined="showPostSaveDialog = false"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import PostSaveDialog from '~/components/global/dialogs/PostSaveDialog.vue'
export default {
  name: 'AddRegion',
  components: {
    PostSaveDialog,
  },
  layout: 'head',
  data() {
    return {
      name: '',
      regionName: '',
      showPostSaveDialog: false,
      rules: {
        required: (value) => !!value || 'Required.',
      },
    }
  },
  methods: {
    async saveRegion() {
      if (!this.$refs.regionForm.validate()) return
      this.regionName = this.name
      const createRegionInput = {
        name: this.name,
      }
      this.$store.commit('location/SET_REGION_INPUT', createRegionInput)
      try {
        const error = await this.$store.dispatch('location/createRegion')
        if (!error) this.reset()
      } catch (_error) {}
    },
    reset() {
      this.$store.commit('location/SET_REGION_INPUT', {})
      this.showPostSaveDialog = true
      this.$refs.regionForm.reset()
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
