<template>
  <section class="tw-bg-white tw-rounded-md tw-p-5">
    <div class="tw-absolute tw-top-11 tw-right-6">
      <button-dark v-if="false" class="tw-mr-2">
        <fa-layers class="tw-mr-2">
          <fa :icon="['fa', 'clock-rotate-left']" />
        </fa-layers>
        <span>History</span>
      </button-dark>

      <button-light v-if="false" @click="isEditable = !isEditable">
        <fa-layers class="tw-mr-2">
          <fa :icon="['fa', 'pen-to-square']" />
        </fa-layers>
        <span>Edit</span>
      </button-light>
    </div>

    <v-form ref="form" v-model="valid" class="tw-max-w-[37rem]">
      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Health</h2>

      <!-- Psychological Status -->
      <div class="form-control">
        <label class="form-label"> Psychological Status </label>
        <custom-combobox
          v-model="psychologicalStatus"
          :items="psychologicalStatuses"
          :rules="[rules.required]"
          required
          :readonly="!isEditable"
        />
      </div>
      <!-- Health Desicription -->
      <div class="form-control">
        <label class="form-label"> Description </label>
        <v-textarea
          v-model="healthDescription"
          :rules="[rules.required, rules.name, rules.textWithSpaces]"
          required
          color="teal darken-2"
          auto-grow
          dense
          outlined
          filled
          rows="3"
          row-height="25"
          :readonly="!isEditable"
        ></v-textarea>
      </div>

      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Assets</h2>

      <div class="asset-container">
        <add-orphan-asset-component
          v-if="isAssetAddOpen"
          @assetClose="handleAssetClose"
          @addAsset="handleAssetSubmit"
        />

        <div v-else>
          <div class="tw-flex tw-items-center tw-gap-2">
            <div v-if="hasAssets">
              <v-chip
                v-for="(asset, idx) in assets"
                :key="idx"
                class="tw-mx-2"
                color="teal darken-3"
                text-color="white"
                close
                @click:close="deleteAsset(asset)"
              >
                <div
                  class="tw-w-[22px] tw-aspect-square tw-relative tw-rounded-full tw-text-emerald-800 tw-bg-white -tw-ml-1 tw-mr-2"
                >
                  <fa-layers
                    class="tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2"
                  >
                    <fa
                      class="tw-w-[13px] tw-h-[13px]"
                      :icon="['fa', 'coins']"
                    />
                  </fa-layers>
                </div>
                {{ asset.name }}
              </v-chip>
            </div>

            <div v-if="!hasAssets && !isEditable" class="form-control tw-w-1/2">
              <v-text-field
                value="None"
                color="teal darken-2"
                dense
                filled
                outlined
              ></v-text-field>
            </div>

            <button-light v-if="isEditable" @click="openAsset">
              <fa-layers>
                <fa
                  class="tw-w-4 tw-h-4 tw-text-emerald-800"
                  :icon="['fa', 'plus']"
                />
              </fa-layers>
              <span class="tw-font-medium tw-text-emerald-800 tw-ml-2">
                Add New Asset
              </span>
            </button-light>
          </div>
        </div>
      </div>

      <div v-if="isEditable" class="tw-flex tw-justify-between tw-mt-8">
        <button-dark
          class="tw-bg-red-800 hover:tw-bg-red-700 tw-rounded-lg tw-py-6 tw-px-5"
          @click="back"
        >
          <fa-layers class="fa-lg">
            <fa :icon="['fa', 'arrow-left-long']" />
          </fa-layers>
          <span class="tw-ml-4"> Back </span>
        </button-dark>

        <button-dark
          :disabled="!valid"
          class="tw-rounded-lg tw-py-6 tw-px-5"
          @click="submit"
        >
          Continue
          <fa-layers class="fa-lg tw-ml-4">
            <fa :icon="['fa', 'arrow-right-long']" />
          </fa-layers>
        </button-dark>
      </div>
    </v-form>
  </section>
</template>

<script>
import AddOrphanAssetComponent from '~/components/coordinator/district/AddOrphanAssetComponent.vue'
import ButtonDark from '~/components/global/ButtonDark.vue'
import ButtonLight from '~/components/global/ButtonLight.vue'

import * as orphanPsychologicalStatusOptions from '~/helpers/psychologicalStatusOptions.json'

export default {
  name: 'HealthInfo',
  components: {
    AddOrphanAssetComponent,
    ButtonDark,
    ButtonLight,
  },

  data() {
    return {
      isEditable: false,
      valid: false,
      isAssetAddOpen: false,
      rules: {
        required: (value) => !!value || 'Required.',
        textWithSpaces: (value) =>
          /^[a-zA-Z ]+$/.test(value) ||
          !value ||
          'Only letters and spaces allowed.',
        name(value) {
          return (
            (value && value.length >= 3) ||
            'Name must be at least 3 characters long.'
          )
        },
      },
    }
  },

  computed: {
    psychologicalStatuses() {
      return orphanPsychologicalStatusOptions.default.psychologicalStatuses
    },

    assets() {
      return this.$store.getters['addOrphan/getOrphanSupplementary'].assets
    },

    hasAssets() {
      return this.assets && this.assets.length > 0
    },

    psychologicalStatus: {
      get() {
        return this.$store.getters['addOrphan/getOrphanSupplementary']
          .psychologicalStatus
      },
      set(value) {
        this.$store.dispatch('addOrphan/setPsychologicalStatus', value)
      },
    },

    healthDescription: {
      get() {
        return this.$store.getters['addOrphan/getOrphanSupplementary']
          .healthDescription
      },
      set(value) {
        this.$store.dispatch('addOrphan/setHealthDescription', value)
      },
    },
  },

  methods: {
    openAsset() {
      this.isAssetAddOpen = true
    },

    closeAsset() {
      this.isAssetAddOpen = false
    },

    deleteAsset(asset) {
      this.$store.dispatch('addOrphan/deleteAsset', asset)
    },

    handleAssetClose() {
      this.$store.dispatch('addOrphan/resetAsset')
      this.closeAsset()
    },

    handleAssetSubmit() {
      this.$store.dispatch('addOrphan/addAssetToOrphan')
      this.closeAsset()
    },

    back() {
      this.$store.dispatch('addOrphan/previousStep')
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('addOrphan/nextStep')
      }
    },
  },
}
</script>

<style scoped>
.form-control {
  @apply tw-w-full tw-flex tw-flex-col tw-gap-1;
}

.form-control-group {
  @apply tw-flex tw-gap-4;
}

.form-label {
  @apply tw-text-sm tw-text-gray-800 tw-font-light;
}
</style>
