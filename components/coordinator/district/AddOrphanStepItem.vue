<template>
  <section
    class="tw-w-full tw-h-full tw-fixed tw-top-0 tw-left-72 tw-border tw-border-black tw-pt-8 tw-pl-10"
  >
    <village-banner />

    <h1 class="tw-text-2xl tw-text-emerald-800 tw-mt-8 tw-mb-6">
      Orphan Details
    </h1>

    <v-form class="tw-max-w-xl">
      <div class="form-control mt-5">
        <label class="tw-text-sm tw-text-gray-800 tw-font-light"> Code </label>
        <v-text-field
          color="teal darken-2"
          dense
          filled
          outlined
        ></v-text-field>
      </div>

      <div class="form-control pr-6">
        <label class="tw-text-sm tw-text-gray-800 tw-font-light">
          Gender
        </label>
        <v-radio-group v-model="gender" class="tw-mt-1" mandatory row>
          <v-radio
            label="Male"
            color="teal darken-2"
            :ripple="false"
            value="M"
          ></v-radio>
          <v-radio
            label="Female"
            color="teal darken-2"
            :ripple="false"
            value="F"
          ></v-radio>
        </v-radio-group>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="tw-text-sm tw-text-gray-800 tw-font-light">
            Name
          </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="tw-text-sm tw-text-gray-800 tw-font-light">
            Father Name
          </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="tw-text-sm tw-text-gray-800 tw-font-light">
            Grand Father Name
          </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="tw-text-sm tw-text-gray-800 tw-font-light">
            Date of Birth
          </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="tw-text-sm tw-text-gray-800 tw-font-light">
            Place of Birth
          </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="tw-text-sm tw-text-gray-800 tw-font-light">
            Religion
          </label>
          <v-combobox
            :items="religions"
            :search-input.sync="religionSearch"
            hide-selected
            color="teal darken-2"
            dense
            filled
            outlined
            small-chips
          >
            <template #no-data>
              <div class="tw-text-sm tw-text-gray-600 tw-rounded-md tw-px-2">
                No religions matching "<strong class="tw-text-black">{{
                  religionSearch
                }}</strong
                >". Press <kbd class="tw-bg-gray-500">enter</kbd> to create a
                new one
              </div>
            </template>
            <template #selection="data">
              <v-chip
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :input-value="data.selected"
                :disabled="data.disabled"
                class="combo-chip tw-bg-white"
                @click:close="data.parent.selectItem(data.item)"
              >
                <v-avatar class="combo-chip-avatar" left>
                  {{ data.item.slice(0, 1).toUpperCase() }}
                </v-avatar>
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
        </div>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="tw-text-sm tw-text-gray-800 tw-font-light">
            Spoken Languages
          </label>
          <v-combobox
            :items="languages"
            :search-input.sync="languageSearch"
            hide-selected
            hint="Press enter to enter a new language"
            color="teal darken-2"
            dense
            filled
            outlined
            multiple
            small-chips
          >
            <template #no-data>
              <div class="tw-text-sm tw-text-gray-600 tw-rounded-md tw-px-2">
                No languages matching "<strong class="tw-text-black">{{
                  languageSearch
                }}</strong
                >". Press <kbd class="tw-bg-gray-500">enter</kbd> to create a
                new one
              </div>
            </template>
            <template #selection="data">
              <v-chip
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :input-value="data.selected"
                :disabled="data.disabled"
                class="combo-chip tw-bg-white tw-my-1"
                @click:close="data.parent.selectItem(data.item)"
              >
                <v-avatar class="combo-chip-avatar" left>
                  {{ data.item.slice(0, 1).toUpperCase() }}
                </v-avatar>
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
        </div>

        <div class="form-control">
          <label class="tw-text-sm tw-text-gray-800 tw-font-light">
            Hobbies
          </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
      </div>
    </v-form>
  </section>
</template>

<script>
import VillageBanner from '~/components/coordinator/district/VillageBanner.vue'
import * as ethiopianLanguages from '~/helpers/commonEthiopianLanguages.json'
import * as ethiopianReligions from '~/helpers/commonEthiopianReligions.json'

export default {
  name: 'AddOrphanStepItem',
  components: { VillageBanner },

  data() {
    return {
      gender: 'M',
      languageSearch: null,
      religionSearch: null,
    }
  },

  computed: {
    languages() {
      return ethiopianLanguages.default.languages
    },
    religions() {
      return ethiopianReligions.default.religions
    },
  },

  created() {
    console.log(ethiopianReligions.default)
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

.combo-chip {
  @apply tw-text-sm tw-text-emerald-800 tw-font-normal tw-border tw-border-emerald-800;
}

.combo-chip-avatar {
  @apply tw-w-5 tw-text-white tw-bg-emerald-800;
}
</style>
