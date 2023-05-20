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
              v-model.trim="name"
              :rules="[rules.required]"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
          <div class="tw-w-full tw-flex tw-justify-end tw-gap-6">
            <button-dark
              :loading="loading"
              :disabled="loading"
              @click="saveZone"
              >Save</button-dark
            >
          </div>
        </div>
      </v-form>
      <post-save-dialog
        v-if="showPostSaveDialog"
        :show="showPostSaveDialog"
        :item-name="zoneName"
        item-type="Zone"
        :no-route="`/locations/${$route.params.regionId}`"
        @redoActionDeclined="showPostSaveDialog = false"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { GraphQLError } from 'graphql'
import PostSaveDialog from '~/components/global/dialogs/PostSaveDialog.vue'
import { createZone, fetchRegions } from '~/services/location.service'
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
      loading: false,
      regionId: this.$route.params.regionId,
      regionOptions: [],
      showPostSaveDialog: false,
      rules: {
        required: (value) => !!value || 'Required.',
      },
    }
  },
  mounted() {
    this.loading = true
    this.initialize()
  },
  methods: {
    async initialize() {
      try {
        this.regionOptions = (await fetchRegions()).map((region) => {
          return {
            text: region.name,
            value: region.id,
          }
        })
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
    async saveZone() {
      if (!this.$refs.zoneForm.validate()) return
      this.loading = true
      this.zoneName = this.name
      const createZoneInput = {
        name: this.name,
        regionId: this.regionId,
      }
      try {
        const data = await createZone(createZoneInput)
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
